'use client';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { TaskItem } from './TaskItem';
import { Task, TaskCategory, useWeekStore } from '@/lib/store/useWeekStore';
import { clsx } from 'clsx';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface WeekColumnProps {
    title: string;
    category: TaskCategory;
    tasks: Task[];
    accentColor?: string;
    isRestricted?: boolean; // For Planned column which might be read-only for adding
    isDropDisabled?: boolean; // Added prop
}

export function WeekColumn({ title, category, tasks, accentColor = 'bg-gray-100', isRestricted, isDropDisabled }: WeekColumnProps) {
    const { setNodeRef } = useDroppable({
        id: category,
        disabled: isDropDisabled, // Use prop
    });

    const { addTask, currentWeek } = useWeekStore(); // Get currentWeek
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState('');

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskContent.trim()) {
            // setIsAdding(false); // Removed as per instruction
            return;
        }
        await addTask(category, newTaskContent);
        setNewTaskContent('');
        // Keep input focused? Or clear/close?
        // simple behavior: keep input for multiple additions
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <span className={clsx("rounded-full px-2.5 py-0.5 text-xs font-semibold", accentColor)}>
                    {tasks.length}
                </span>
            </div>

            {/* Task List Container */}
            <div
                ref={setNodeRef}
                className="flex-1 space-y-3 rounded-3xl bg-gray-50/50 p-2 min-h-[200px]"
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </SortableContext>

                {tasks.length === 0 && ( // Removed !isAdding
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 text-sm text-gray-400">
                        Henüz görev yok
                    </div>
                )}

                {/* Add Input - Only allow adding if not 'planned' usually? Or allow all? */}
                {/* Design choice: Can user add to "Planned" mid-week? Maybe not. */}
                {category !== 'planned' && !currentWeek?.is_locked && (
                    <form
                        onSubmit={handleAddTask}
                        className="mt-4 flex items-center gap-2"
                    >
                        <div className="relative flex-1">
                            <Plus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={newTaskContent}
                                onChange={(e) => setNewTaskContent(e.target.value)}
                                placeholder="Görev ekle..."
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
