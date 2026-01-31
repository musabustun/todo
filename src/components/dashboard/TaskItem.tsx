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
                'group relative flex items-start gap-4 p-3 transition-all rounded-lg',
                isDragging ? 'z-50 opacity-50 bg-foreground/5' : 'hover:bg-foreground/[0.02]',
                isOverlay ? 'cursor-grabbing shadow-soft bg-background border border-foreground/10' : '',
                task.is_completed && 'opacity-60' // Dim completed tasks
            )}
        >
            {/* Drag Handle */}
            <button
                {...attributes}
                {...listeners}
                className="mt-1 cursor-grab text-foreground-muted/30 opacity-0 group-hover:opacity-100 active:cursor-grabbing hover:text-foreground transition-all"
            >
                <GripVertical className="h-4 w-4" />
            </button>

            {/* Checkbox (Custom) */}
            <button
                onClick={toggleCompleted}
                className={clsx(
                    'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border transition-all duration-300',
                    task.is_completed
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-foreground/20 bg-transparent hover:border-primary/50'
                )}
            >
                <CheckCircle className={clsx('h-3.5 w-3.5', !task.is_completed && 'hidden')} />
            </button>

            {/* Content */}
            <span
                className={clsx(
                    'flex-1 text-base text-foreground font-light leading-relaxed break-all transition-all', // Increased font size and lighter weight
                    task.is_completed && 'text-foreground-muted line-through decoration-foreground/20 decoration-1'
                )}
            >
                {task.content}
            </span>

            {/* Actions */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 p-0 text-foreground-muted/30 opacity-0 transition-all hover:text-error hover:bg-error/10 group-hover:opacity-100"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
