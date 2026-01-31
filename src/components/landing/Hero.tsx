'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 mx-auto max-w-4xl"
                >
                    <div className="mb-6 inline-flex items-center justify-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary-foreground/90 text-gray-600">Haftalık Refleksiyon & Planlama</span>
                    </div>

                    <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
                        Geçmişi düşün. <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Geleceği planla.
                        </span>
                    </h1>

                    <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
                        Haftayı net bir şekilde kapatmana yardımcı olacak minimal bir araç. Ne planladığın ile ne yaptığını karşılaştır ve gelecek hafta için niyetlerini belirle.
                    </p>

                    <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <Link href="/signup">
                            <Button size="lg" className="group">
                                Hemen Başla
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="outline" size="lg">
                                Nasıl Çalışır
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Decorative background blobs */}
                <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute top-20 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />
            </div>
        </section>
    );
}
