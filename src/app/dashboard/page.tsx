'use client';

import { useEffect, useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { WeekColumn } from '@/components/dashboard/WeekColumn';
import { TaskItem } from '@/components/dashboard/TaskItem';
import { useWeekStore, Task } from '@/lib/store/useWeekStore';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
    const { tasks, fetchCurrentWeek, isLoading, currentWeek, reorderTask } = useWeekStore();
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchCurrentWeek();
    }, [fetchCurrentWeek]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const plannedTasks = tasks.filter(t => t.category === 'planned');
    const doneTasks = tasks.filter(t => t.category === 'done');
    const nextTasks = tasks.filter(t => t.category === 'next');

    // DnD Handlers
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find(t => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            reorderTask(active.id as string, over.id as string);
        }

        setActiveTask(null);
    };

    if (isLoading && !currentWeek) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid h-full gap-6 md:grid-cols-3">
                {/* Column 1: Planned (Read Only / Checkable) */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <WeekColumn
                        category="planned"
                        title="Ne Yapacaktım"
                        tasks={plannedTasks}
                        accentColor="bg-purple-100 text-purple-700"
                        isRestricted={currentWeek?.is_locked} // Can't add new planned tasks if locked (logic may vary)
                        isDropDisabled={true} // Can't drop here usually, unless reverting? Let's say yes for now
                    />
                </div>

                {/* Column 2: What I Did (The focus) */}
                <div className="rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/50 ring-1 ring-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary" />
                    <WeekColumn
                        title="What I Did"
                        category="done"
                        tasks={doneTasks}
                        accentColor="bg-green-100 text-green-700"
                    />
                </div>

                {/* Next */}
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                    <WeekColumn
                        title="What I Will Do"
                        category="next"
                        tasks={nextTasks}
                        accentColor="bg-blue-100 text-blue-700"
                    />
                </div>
            </div>

            <DragOverlay>
                {activeTask ? <TaskItem task={activeTask} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    );
}
