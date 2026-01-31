import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-foreground-muted border-t border-foreground/5 font-sans">
        <p>© {new Date().getFullYear()} Reflect. Niyetle inşa et.</p>
      </footer>
    </main>
  );
}
