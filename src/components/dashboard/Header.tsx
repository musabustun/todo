'use client';

import { Bell, User, LogOut, Lock, Unlock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWeekStore } from '@/lib/store/useWeekStore';
import { format, addDays, differenceInHours, differenceInMinutes } from 'date-fns';
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
        router.push('/auth/login');
    };

    useEffect(() => {
        if (!currentWeek?.locked_at) return;

        const interval = setInterval(() => {
            const unlockDate = addDays(new Date(currentWeek.locked_at!), 7);
            const now = new Date();
            const diffHours = differenceInHours(unlockDate, now);

            if (diffHours < 0) {
                setTimeLeft('Ready to unlock');
            } else {
                const diffMins = differenceInMinutes(unlockDate, now) % 60;
                setTimeLeft(`${diffHours}h ${diffMins}m`);
            }
        }, 60000);

        const unlockDate = addDays(new Date(currentWeek.locked_at!), 7);
        const now = new Date();
        const diffHours = differenceInHours(unlockDate, now);
        if (diffHours < 0) {
            setTimeLeft('Ready to unlock');
        } else {
            const diffMins = differenceInMinutes(unlockDate, now) % 60;
            setTimeLeft(`${diffHours}h ${diffMins}m`);
        }

        return () => clearInterval(interval);
    }, [currentWeek?.locked_at]);

    const isLocked = currentWeek?.is_locked;
    const isReadyToUnlock = timeLeft === 'Ready to unlock';

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Left: Logo & Week Info */}
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-gray-900">
                            Reflect
                        </Link>
                        <div className="hidden h-6 w-px bg-gray-200 md:block" />
                        <div className="hidden md:block">
                            <span className="text-sm font-medium text-gray-500">Current Week</span>
                            {currentWeek && (
                                <span className="ml-2 text-sm font-semibold text-gray-900">
                                    {format(new Date(currentWeek.start_date), 'MMM d')} - {format(new Date(currentWeek.end_date), 'MMM d')}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        {/* Lock Status & Actions */}
                        {currentWeek && !isLocked && (
                            <Button
                                onClick={() => lockWeek()}
                                className="mr-2 bg-gray-900 hover:bg-gray-800 text-white gap-2"
                                size="sm"
                            >
                                <Lock className="h-3.5 w-3.5" />
                                Lock Plan
                            </Button>
                        )}

                        {isLocked && (
                            <div className="mr-2 flex items-center gap-3">
                                <div className="hidden items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 md:flex">
                                    <Timer className="h-3.5 w-3.5" />
                                    <span>{timeLeft}</span>
                                </div>
                                <Button
                                    variant={isReadyToUnlock ? "primary" : "outline"}
                                    size="sm"
                                    className="h-8 text-xs"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {isReadyToUnlock ? "Unlock & Reflect" : "End Week Early"}
                                </Button>
                            </div>
                        )}

                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                            <Bell className="h-5 w-5 text-gray-500" />
                        </Button>

                        <div className="relative group">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full border border-gray-200">
                                <User className="h-5 w-5 text-gray-600" />
                            </Button>
                            <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-gray-100 bg-white p-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            <WeekEndModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    );
}
