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
}

export const useWeekStore = create<WeekState>((set, get) => ({
    currentWeek: null,
    tasks: [],
    isLoading: false,

    fetchCurrentWeek: async () => {
        set({ isLoading: true });
        const supabase = createClient();

        // Logic to find active week or create one if none exists (simplified)
        // For now, let's assume we fetch the latest active week
        const { data: weekData, error: weekError } = await supabase
            .from('weeks')
            .select('*')
            .eq('status', 'active')
            .limit(1)
            .single();

        if (weekError && weekError.code !== 'PGRST116') {
            console.error('Error fetching week:', weekError);
            set({ isLoading: false });
            return;
        }

        // If no active week, we might need to create one (logic to be added)
        if (!weekData) {
            set({ isLoading: false });
            return;
        }

        const { data: tasksData, error: tasksError } = await supabase
            .from('tasks')
            .select('*')
            .eq('week_id', weekData.id)
            .order('order_index', { ascending: true });

        if (tasksError) {
            console.error('Error fetching tasks:', tasksError);
        }

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
