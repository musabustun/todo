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
        <div className="grid gap-8 md:grid-cols-2">
            {/* Planned vs Actual Column */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Planlanan vs Gerçekleşen</h3>
                <div className="space-y-3">
                    {plannedTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={clsx(
                                "flex items-center gap-3 rounded-xl border p-4 shadow-sm",
                                task.is_completed
                                    ? "border-green-200 bg-green-50/50"
                                    : "border-red-200 bg-red-50/50"
                            )}
                        >
                            {task.is_completed ? (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                                    <XCircle className="h-5 w-5" />
                                </div>
                            )}

                            <div className="flex-1">
                                <p className={clsx("font-medium", task.is_completed ? "text-green-900" : "text-red-900")}>
                                    {task.content}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {task.is_completed ? "Planlandığı gibi tamamlandı" : "Tamamlanmadı"}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {plannedTasks.length === 0 && (
                        <p className="text-gray-400 italic">Bu hafta için planlanan görev yok.</p>
                    )}
                </div>
            </div>

            {/* Extra Achievements Column */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Ekstra Başarılar</h3>
                <div className="space-y-3">
                    {doneTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <PlusCircle className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-blue-900">{task.content}</p>
                                <p className="text-xs text-blue-600/70">Plan dışı başarı</p>
                            </div>
                        </motion.div>
                    ))}

                    {doneTasks.length === 0 && (
                        <p className="text-gray-400 italic">Ekstra başarı kaydedilmedi.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
