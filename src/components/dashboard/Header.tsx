'use client';

import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import Link from 'next/link';

export function Header() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    return (
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
                        <span className="ml-2 text-sm font-semibold text-gray-900">Oct 23 - Oct 29</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* Placeholder for Lock Status */}
                    <div className="mr-2 hidden items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 md:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                    </div>

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
        </header>
    );
}
