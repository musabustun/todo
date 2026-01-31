'use client';

import { motion } from 'framer-motion';

const steps = [
    {
        step: "01",
        title: "Haftanı Planla",
        description: "Gelecek hafta için 'Ne Yapacağım' kısmını doldur. Gerçekçi ve niyetli ol.",
    },
    {
        step: "02",
        title: "Kilitle ve Uygula",
        description: "Planını kilitle. Uygulamaya odaklan. İlerledikçe 'Ne Yaptım' kısmını takip edebilirsin.",
    },
    {
        step: "03",
        title: "Yansıt ve Karşılaştır",
        description: "Hafta sonunda döngü açılır. Planın ile gerçekte olanı karşılaştır.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-32 relative overflow-hidden bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-24 text-center">
                    <span className="block mb-4 text-sm font-medium tracking-widest uppercase text-primary">Süreç</span>
                    <h2 className="text-4xl font-serif text-foreground md:text-5xl">
                        Nasıl Çalışır?
                    </h2>
                </div>

                <div className="relative mx-auto max-w-5xl">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground/10 md:block" />

                    <div className="space-y-24 md:space-y-32">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col items-center md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Text Content */}
                                <div className={`w-full text-center md:w-1/2 md:px-16 ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="mb-6 inline-block md:hidden text-6xl font-serif text-foreground/5 font-bold">
                                        {item.step}
                                    </div>
                                    <h3 className="mb-4 text-3xl font-serif text-foreground">{item.title}</h3>
                                    <p className="text-lg text-foreground-muted font-light leading-relaxed text-balance">{item.description}</p>
                                </div>

                                {/* Center Node */}
                                <div className="relative z-10 hidden flex-shrink-0 items-center justify-center md:flex px-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background border border-foreground/10 text-foreground/40 font-serif text-xl shadow-soft">
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
