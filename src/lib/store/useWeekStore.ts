import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export type TaskCategory = 'planned' | 'done' | 'next' | 'extra';

export interface Task {
    id: string;
    category: TaskCategory;
    content: string;
    is_completed: boolean;
    order_index: number;
}

export interface Week {
    id: string;
    start_date: string;
    end_date: string;
    is_locked: boolean;
    locked_at: string | null;
    status: 'active' | 'completed';
}

interface WeekState {
    currentWeek: Week | null;
    tasks: Task[];
    isLoading: boolean;

    // Actions
    fetchCurrentWeek: () => Promise<void>;
    addTask: (category: TaskCategory, content: string) => Promise<void>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    lockWeek: () => Promise<void>;
    reorderTask: (activeId: string, overId: string) => Promise<void>;
}

export const useWeekStore = create<WeekState>((set, get) => ({
    currentWeek: null,
    tasks: [],
    isLoading: false,

    fetchCurrentWeek: async () => {
        set({ isLoading: true });
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            set({ isLoading: false });
            return;
        }

        // 1. Try to find active week
        let { data: weekData, error: weekError } = await supabase
            .from('weeks')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .limit(1)
            .maybeSingle();

        // 2. If no active week, create one
        if (!weekData) {
            // Check if there are ANY weeks (to determine if it's the very first one or just a finished cycle)
            // For simplicity, just create a new active week starting today
            const start = new Date();
            const end = new Date();
            end.setDate(end.getDate() + 7); // Default 7 days, but logic is driven by Lock

            const { data: newWeek, error: createError } = await supabase
                .from('weeks')
                .insert({
                    user_id: user.id,
                    start_date: start.toISOString(),
                    end_date: end.toISOString(),
                    status: 'active'
                })
                .select()
                .single();

            if (createError) {
                console.error('Error creating week:', createError);
                set({ isLoading: false });
                return;
            }
            weekData = newWeek;
        }

        const { data: tasksData, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .eq('week_id', weekData.id)
            .order('order_index', { ascending: true });

        set({
            currentWeek: weekData,
            tasks: tasksData || [],
            isLoading: false
        });
    },

    addTask: async (category, content) => {
        const { currentWeek, tasks } = get();
        if (!currentWeek) return;

        const supabase = createClient();
        const tempId = crypto.randomUUID();
        const orderIndex = tasks.filter(t => t.category === category).length;

        // Optimistic update
        const newTask: Task = {
            id: tempId,
            category,
            content,
            is_completed: false,
            order_index: orderIndex
        };

        set({ tasks: [...tasks, newTask] });

        const { data, error } = await supabase.from('tasks').insert({
            week_id: currentWeek.id,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            category,
            content,
            order_index: orderIndex
        }).select().single();

        if (error) {
            console.error('Error adding task:', error);
            // Revert optimistic update
            set({ tasks: tasks.filter(t => t.id !== tempId) });
            return;
        }

        // Replace temp ID with real one
        set(state => ({
            tasks: state.tasks.map(t => t.id === tempId ? data : t)
        }));
    },

    updateTask: async (id, updates) => {
        const { tasks } = get();
        set({ tasks: tasks.map(t => t.id === id ? { ...t, ...updates } : t) });

        const supabase = createClient();
        const { error } = await supabase.from('tasks').update(updates).eq('id', id);

        if (error) {
            console.error('Error updating task:', error);
            // Revert (requires keeping previous state or refetching)
            // For simple usage, we could refetch or just log error
        }
    },

    deleteTask: async (id) => {
        const { tasks } = get();
        set({ tasks: tasks.filter(t => t.id !== id) });

        const supabase = createClient();
        const { error } = await supabase.from('tasks').delete().eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
        }
    },

    reorderTask: async (activeId, overId) => {
        const { tasks } = get();
        const oldIndex = tasks.findIndex(t => t.id === activeId);
        const newIndex = tasks.findIndex(t => t.id === overId);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        const newTasks = [...tasks];
        const [movedTask] = newTasks.splice(oldIndex, 1);
        newTasks.splice(newIndex, 0, movedTask);

        // Update order_index for all tasks 
        const updates = newTasks.map((t, index) => ({
            id: t.id,
            order_index: index
        }));

        // Optimistic update
        set({ tasks: newTasks.map((t, i) => ({ ...t, order_index: i })) });

        const supabase = createClient();
        for (const update of updates) {
            await supabase.from('tasks').update({ order_index: update.order_index }).eq('id', update.id);
        }
    },

    lockWeek: async () => {
        const { currentWeek } = get();
        if (!currentWeek) return;

        const supabase = createClient();
        const updates = {
            is_locked: true,
            locked_at: new Date().toISOString()
        };

        set({ currentWeek: { ...currentWeek, ...updates } as Week });

        const { error } = await supabase.from('weeks').update(updates).eq('id', currentWeek.id);

        if (error) {
            console.error('Error locking week:', error);
        }
    }
}));
```
