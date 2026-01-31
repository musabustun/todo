'use client';

import { motion } from 'framer-motion';
import { Columns, GitCompare, Lock } from 'lucide-react';

const features = [
    {
        icon: Columns,
        title: 'Üç Sütunlu Sistem',
        description: 'Düşüncelerini yapılandır: Ne Yapacaktım (Niyet), Ne Yaptım (Eylem) ve Ne Yapacağım (Gelecek).',
    },
    {
        icon: Lock,
        title: 'Haftalık Kilit',
        description: 'Planına sadık kal. Kilitlendiğinde, planlanan görevlerin bir sonraki döngüye kadar sabitlenir.',
    },
    {
        icon: GitCompare,
        title: 'Görsel Karşılaştırma',
        description: 'Niyet ve eylem arasındaki farkı Git tarzı bir karşılaştırma görünümü ile analiz et.',
    },
];

export function Features() {
    return (
        <section className="py-32 bg-background border-t border-foreground/5">
            <div className="container mx-auto px-6">
                <div className="mb-20 max-w-2xl">
                    <span className="block mb-4 text-sm font-medium tracking-widest uppercase text-primary">Metodoloji</span>
                    <h2 className="mb-6 text-4xl font-serif text-foreground md:text-5xl">
                        Basit ama güçlü bir akış.
                    </h2>
                    <p className="text-xl text-foreground-muted font-light leading-relaxed">
                        Karmaşık proje yönetim araçlarının yükü olmadan tutarlılık oluşturman için tasarlandı.
                        <span className="italic block mt-2 text-foreground/80">Az ama öz.</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10 border-t border-b border-foreground/10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="group p-8 md:p-12 hover:bg-foreground/5 transition-colors duration-500"
                        >
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/10 bg-background text-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors duration-300">
                                <feature.icon className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-4 text-2xl font-serif text-foreground">{feature.title}</h3>
                            <p className="text-foreground-muted leading-relaxed font-light">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
