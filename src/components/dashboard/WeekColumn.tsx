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
}

export function WeekColumn({ title, category, tasks, accentColor = 'bg-gray-100', isRestricted }: WeekColumnProps) {
    const { setNodeRef } = useDroppable({
        id: category,
    });

    const { addTask } = useWeekStore();
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState('');

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskContent.trim()) {
            setIsAdding(false);
            return;
        }
        await addTask(category, newTaskContent);
        setNewTaskContent('');
        setIsAdding(false);
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

                {tasks.length === 0 && !isAdding && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-sm text-gray-400">Empty list</p>
                    </div>
                )}

                {/* Add Task Input */}
                {isAdding ? (
                    <form onSubmit={handleAddTask} className="mt-2">
                        <input
                            autoFocus
                            type="text"
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                            onBlur={() => !newTaskContent && setIsAdding(false)}
                            placeholder="Type a task..."
                            className="w-full rounded-xl border border-primary px-3 py-3 text-sm shadow-sm outline-none placeholder:text-gray-400"
                        />
                    </form>
                ) : (
                    !isRestricted && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-primary hover:text-primary transition-colors hover:bg-white"
                        >
                            <Plus className="h-4 w-4" />
                            Add task
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
