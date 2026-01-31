'use client';

import { Task } from '@/lib/store/useWeekStore';
import { CheckCircle, XCircle, PlusCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface DiffViewProps {
    plannedTasks: Task[];
    doneTasks: Task[];
}

export function DiffView({ plannedTasks, doneTasks }: DiffViewProps) {
    // Logic:
    // 1. Planned tasks:
    //    - Completed -> Green (Success)
    //    - Not Completed -> Red (Missed)
    // 2. Done tasks (Extra):
    //    - items in 'done' category -> Blue (Extra)

    // Note: users might populate 'done' with items that were in 'planned'.
    // But our model keeps them separate categories. 
    // If user checked a planned task, it stays in 'planned' but is_completed=true.
    // If user added a task to 'done', it is 'done' category.

    return (
        <div className="grid gap-12 md:grid-cols-2">
            {/* Planned vs Actual Column */}
            <div className="space-y-8">
                <h3 className="text-2xl font-serif text-foreground border-b border-foreground/10 pb-4">Planlanan vs Gerçekleşen</h3>
                <div className="space-y-2">
                    {plannedTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={clsx(
                                "flex items-start gap-4 p-4 border-b border-foreground/5 last:border-0",
                                task.is_completed ? "opacity-100" : "opacity-60"
                            )}
                        >
                            {task.is_completed ? (
                                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-sm bg-success text-white">
                                    <CheckCircle className="h-4 w-4" />
                                </div>
                            ) : (
                                <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-sm text-error">
                                    <XCircle className="h-5 w-5" />
                                </div>
                            )}

                            <div className="flex-1">
                                <p className={clsx("text-base font-light text-foreground", !task.is_completed && "line-through decoration-error/30")}>
                                    {task.content}
                                </p>
                                <p className="text-xs font-bold tracking-wider uppercase text-foreground-muted mt-1">
                                    {task.is_completed ? "Tamamlandı" : "Tamamlanmadı"}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {plannedTasks.length === 0 && (
                        <p className="text-foreground-muted italic font-light">Bu hafta için planlanan görev yok.</p>
                    )}
                </div>
            </div>

            {/* Extra Achievements Column */}
            <div className="space-y-8">
                <h3 className="text-2xl font-serif text-foreground border-b border-foreground/10 pb-4">Ekstra Başarılar</h3>
                <div className="space-y-2">
                    {doneTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 border-b border-foreground/5 last:border-0"
                        >
                            <div className="mt-1 flex h-5 w-5 items-center justify-center text-primary">
                                <PlusCircle className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base font-light text-foreground">{task.content}</p>
                                <p className="text-xs font-bold tracking-wider uppercase text-foreground-muted mt-1">Plan Dışı</p>
                            </div>
                        </motion.div>
                    ))}

                    {doneTasks.length === 0 && (
                        <p className="text-foreground-muted italic font-light">Ekstra başarı kaydedilmedi.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
