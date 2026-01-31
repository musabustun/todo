'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, CheckCircle, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import { Task } from '@/lib/store/useWeekStore';
import { useWeekStore } from '@/lib/store/useWeekStore';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
    task: Task;
    isOverlay?: boolean;
}

export function TaskItem({ task, isOverlay }: TaskItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const { updateTask, deleteTask } = useWeekStore();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const toggleCompleted = () => {
        updateTask(task.id, { is_completed: !task.is_completed });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={clsx(
                'group relative flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm transition-all',
                isDragging ? 'z-50 opacity-50 ring-2 ring-primary' : 'hover:border-primary/50',
                isOverlay ? 'cursor-grabbing shadow-xl ring-2 ring-primary' : '',
                task.is_completed && 'bg-gray-50'
            )}
        >
            {/* Drag Handle */}
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab text-gray-300 opacity-0 group-hover:opacity-100 active:cursor-grabbing hover:text-gray-500"
            >
                <GripVertical className="h-4 w-4" />
            </button>

            {/* Checkbox (Custom) */}
            <button
                onClick={toggleCompleted}
                className={clsx(
                    'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-colors',
                    task.is_completed
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : 'border-gray-300 text-transparent hover:border-gray-400'
                )}
            >
                <CheckCircle className={clsx('h-3.5 w-3.5', !task.is_completed && 'hidden')} />
            </button>

            {/* Content */}
            <span
                className={clsx(
                    'flex-1 text-sm text-gray-700 font-medium break-all',
                    task.is_completed && 'text-gray-400 line-through decoration-gray-300'
                )}
            >
                {task.content}
            </span>

            {/* Actions */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 p-0 text-gray-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
