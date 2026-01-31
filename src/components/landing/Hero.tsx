'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-40 bg-grain">
            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo-ish
                    className="mx-auto max-w-5xl"
                >
                    <div className="mb-8 inline-flex items-center justify-center border-y border-foreground/10 py-2 px-6">
                        <span className="text-sm font-medium tracking-widest uppercase text-foreground-muted">
                            Refleksiyon & Planlama Sistemleri
                        </span>
                    </div>

                    <h1 className="mb-8 font-serif text-6xl font-medium tracking-tight text-foreground md:text-8xl lg:text-9xl leading-[0.9]">
                        Geçmişi <span className="italic text-primary">düşün</span>, <br />
                        Geleceği <span className="italic text-secondary">planla</span>.
                    </h1>

                    <p className="mx-auto mb-12 max-w-2xl text-xl text-foreground-muted md:text-2xl leading-relaxed font-light">
                        Haftayı net bir şekilde kapatmana yardımcı olacak minimal bir araç.
                        Ne planladığını, ne yaptığını gör; <span className="text-foreground font-medium underline decoration-accent decoration-2 underline-offset-4">niyetle inşa et.</span>
                    </p>

                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                        <Link href="/signup">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105">
                                Hemen Başla
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-foreground/20 hover:bg-foreground/5 hover:text-foreground">
                                Nasıl Çalışır
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Minimalist Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            {/* Subtle Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        </section>
    );
}
