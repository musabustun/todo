'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const steps = [
    {
        step: 1,
        title: "Haftanı Planla",
        description: "Gelecek hafta için 'Ne Yapacağım' kısmını doldur. Gerçekçi ve niyetli ol.",
    },
    {
        step: 2,
        title: "Kilitle ve Uygula",
        description: "Planını kilitle. Uygulamaya odaklan. İlerledikçe 'Ne Yaptım' kısmını takip edebilirsin.",
    },
    {
        step: 3,
        title: "Yansıt ve Karşılaştır",
        description: "Hafta sonunda döngü açılır. Planın ile gerçekte olanı karşılaştır.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10" />

            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold font-display text-gray-900 md:text-4xl">
                        Nasıl Çalışır
                    </h2>
                </div>

                <div className="relative mx-auto max-w-4xl">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gray-200 md:block" />

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col items-center md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Text Content */}
                                <div className="w-full text-center md:w-1/2 md:p-12 md:text-left">
                                    <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold shadow-lg md:hidden`}>
                                        {item.step}
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>

                                {/* Center Node */}
                                <div className="relative z-10 hidden flex-shrink-0 items-center justify-center md:flex px-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-4 border-primary text-primary font-bold shadow-xl">
                                        {item.step}
                                    </div>
                                </div>

                                {/* Empty Space for Grid */}
                                <div className="hidden w-full md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
