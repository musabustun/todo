'use client';

import { Bell, User, LogOut, Lock, Unlock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWeekStore } from '@/lib/store/useWeekStore';
import { format, addDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { WeekEndModal } from '@/components/dashboard/WeekEndModal';

export function Header() {
    const router = useRouter();
    const supabase = createClient();
    const { currentWeek, lockWeek } = useWeekStore();
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    useEffect(() => {
        if (!currentWeek?.locked_at) return;

        const interval = setInterval(() => {
            const unlockDate = addDays(new Date(currentWeek.locked_at!), 7);
            const now = new Date();
            const diffHours = differenceInHours(unlockDate, now);

            if (diffHours < 0) {
                setTimeLeft('Açılmaya Hazır');
            } else {
                const diffMins = differenceInMinutes(unlockDate, now) % 60;
                setTimeLeft(`${diffHours}s ${diffMins}dk`);
            }
        }, 60000);

        const unlockDate = addDays(new Date(currentWeek.locked_at!), 7);
        const now = new Date();
        const diffHours = differenceInHours(unlockDate, now);
        if (diffHours < 0) {
            setTimeLeft('Açılmaya Hazır');
        } else {
            const diffMins = differenceInMinutes(unlockDate, now) % 60;
            setTimeLeft(`${diffHours}s ${diffMins}dk`);
        }

        return () => clearInterval(interval);
    }, [currentWeek?.locked_at]);

    const isLocked = currentWeek?.is_locked;
    const isReadyToUnlock = timeLeft === 'Açılmaya Hazır';

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    {/* Left: Logo & Week Info */}
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="text-2xl font-serif font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity">
                            Reflect.
                        </Link>
                        <div className="hidden h-8 w-px bg-foreground/10 md:block" />
                        <div className="hidden md:block">
                            <span className="block text-xs font-bold tracking-widest uppercase text-foreground-muted mb-0.5">Mevcut Döngü</span>
                            {currentWeek && (
                                <span className="text-sm font-serif text-foreground">
                                    {format(new Date(currentWeek.start_date), 'd MMMM', { locale: tr })} — {format(new Date(currentWeek.end_date), 'd MMMM', { locale: tr })}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Lock Status & Actions */}
                        {currentWeek && !isLocked && (
                            <Button
                                onClick={() => lockWeek()}
                                className="mr-2 bg-foreground text-background hover:bg-foreground/90 gap-2 h-10 px-6 rounded-full font-medium"
                                size="sm"
                            >
                                <Lock className="h-4 w-4" />
                                Planı Kilitle
                            </Button>
                        )}

                        {isLocked && (
                            <div className="mr-2 flex items-center gap-4">
                                <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary md:flex">
                                    <Timer className="h-3.5 w-3.5" />
                                    <span>{timeLeft}</span>
                                </div>
                                <Button
                                    variant={isReadyToUnlock ? "primary" : "outline"}
                                    size="sm"
                                    className="h-10 px-5 text-sm rounded-full"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {isReadyToUnlock ? "Kilidi Aç & Değerlendir" : "Haftayı Bitir"}
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center gap-2 border-l border-foreground/10 pl-4 ml-2">
                            <Button variant="ghost" size="icon" className="h-10 w-10 p-0 rounded-full hover:bg-foreground/5 text-foreground-muted hover:text-foreground">
                                <Bell className="h-5 w-5" />
                            </Button>

                            <div className="relative group">
                                <Button variant="ghost" size="icon" className="h-10 w-10 p-0 rounded-full border border-foreground/10 hover:border-foreground/30 text-foreground-muted hover:text-foreground">
                                    <User className="h-5 w-5" />
                                </Button>
                                <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-lg border border-foreground/5 bg-background p-1 shadow-soft opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-error hover:bg-error/5 transition-colors font-medium"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Çıkış Yap
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            <WeekEndModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    );
}
