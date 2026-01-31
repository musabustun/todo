'use client';

import { useTransition, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { login } from '../actions';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await login(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Sign in to continue your weekly reflections</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : 'Log In'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
