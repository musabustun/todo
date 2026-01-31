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
        <div className="flex flex-col h-full p-6 md:p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-serif font-medium text-foreground">{title}</h2>
                <span className={clsx("rounded-md px-2 py-1 text-xs font-bold tracking-wider uppercase", accentColor)}>
                    {tasks.length}
                </span>
            </div>

            {/* Task List Container */}
            <div
                ref={setNodeRef}
                className="flex-1 space-y-4 min-h-[200px]"
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </SortableContext>

                {tasks.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-foreground/10 bg-transparent text-sm text-foreground-muted font-light">
                        Henüz görev yok
                    </div>
                )}

                {/* Add Input */}
                {category !== 'planned' && !currentWeek?.is_locked && (
                    <form
                        onSubmit={handleAddTask}
                        className="mt-6 flex items-center gap-2"
                    >
                        <div className="relative flex-1 group">
                            <Plus className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted group-hover:text-primary transition-colors" />
                            <input
                                type="text"
                                value={newTaskContent}
                                onChange={(e) => setNewTaskContent(e.target.value)}
                                placeholder="Görev ekle..."
                                className="h-10 w-full bg-transparent border-b border-foreground/10 pl-7 pr-3 text-base placeholder-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors font-light"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
