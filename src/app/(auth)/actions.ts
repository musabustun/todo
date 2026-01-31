'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return { error: error.message };
    }

    redirect('/dashboard');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Assuming local dev if not set

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const { error } = await supabase.auth.signUp({
        ...data,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true, message: 'Kayıt işlemine devam etmek için e-postanı kontrol et.' };
}
