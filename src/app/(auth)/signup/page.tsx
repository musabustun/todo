'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signup } from '../actions';
import { ArrowLeft, Loader2, CheckCircle, UserPlus } from 'lucide-react';

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ana Sayfaya Dön
            </Link>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Hesap Oluştur</h1>
                    <p className="text-gray-500 mt-2">Haftalık niyetlerini belirlemeye başla</p>
                </div>

                {isSuccess ? (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">Hesap oluşturuldu</h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>Kayıt işlemini tamamlamak için lütfen email adresini kontrol et.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className="space-y-4" action={async (formData: FormData) => {
                        setIsLoading(true);
                        const res = await signup(formData);
                        if (res?.success) {
                            setIsSuccess(true);
                        }
                        setIsLoading(false);
                    }}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email adresi</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="Email adresi"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                minLength={6}
                                className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="Şifre"
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                <>
                                    <UserPlus className="h-5 w-5 mr-2" aria-hidden="true" />
                                    Kayıt Ol
                                </>
                            )}
                        </Button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    Zaten hesabın var mı?{' '}
                    <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                        Giriş yap
                    </Link>
                </div>
            </div>
        </div>
    );
}
