'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { login } from '../actions';
import { ArrowLeft, Loader2, LogIn } from 'lucide-react';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null); // Removed error state as per new code

    // Removed handleSubmit function as per new code, logic inlined in form action

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Tekrar Hoşgeldin</h1>
                    <p className="text-gray-500 mt-2">Haftalık refleksiyonlarına devam etmek için giriş yap</p>
                </div>

                <form action={async (formData: FormData) => {
                    setIsLoading(true);
                    await login(formData);
                    // Redirection is handled by the server action
                    setIsLoading(false);
                }} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email adresi
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="Email adresi"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Şifre
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="Şifre"
                        />
                    </div>

                    {/* Removed error display as per new code */}

                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin text-primary-foreground/50" />
                            ) : (
                                <LogIn className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground" aria-hidden="true" />
                            )}
                        </span>
                        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Hesabın yok mu?{' '}
                    <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
                        Kayıt ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
