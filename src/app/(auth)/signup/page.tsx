'use client';

import { useTransition, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signup } from '../actions';
import { ArrowLeft, Loader2, Check } from 'lucide-react';

export default function SignupPage() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await signup(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                setSuccess(true);
            }
        });
    };

    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
                    <p className="text-gray-500 mb-8">
                        We've sent you a confirmation link to complete your registration.
                    </p>
                    <Link href="/auth/login">
                        <Button variant="outline" className="w-full">Back to Login</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 mt-2">Start your journey to better weekly planning</p>
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
                            minLength={6}
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
                        {isPending ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="font-medium text-primary hover:text-primary/80">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
