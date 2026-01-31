import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/dashboard/Header';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            <main className="container mx-auto px-4 pt-24 pb-12">
                {children}
            </main>
        </div>
    );
}
