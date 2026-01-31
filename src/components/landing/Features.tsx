'use client';

import { motion } from 'framer-motion';
import { Columns, GitCompare, Lock, CheckCircle } from 'lucide-react';

const features = [
    {
        icon: Columns,
        title: 'Three-Column System',
        description: 'Structure your thoughts into What I Planned, What I Did, and What I Will Do.',
        color: 'bg-primary/10 text-primary',
    },
    {
        icon: Lock,
        title: 'Weekly Lock',
        description: 'Commit to your plan. Once locked, your planned tasks are set until the next cycle.',
        color: 'bg-secondary/10 text-secondary-foreground', // using peach
    },
    {
        icon: GitCompare,
        title: 'Visual Diff',
        description: 'See the gap between intention and action with a Git-style comparison view.',
        color: 'bg-accent/20 text-accent-foreground',
    },
];

export function Features() {
    return (
        <section className="py-24 bg-white/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold font-display text-gray-900 md:text-4xl">
                        Simple yet powerful workflow
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Designed to help you build consistency without the overwhelm of complex project management tools.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50 ring-1 ring-gray-100"
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
