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
      <footer className="py-10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Reflect. Build with intention.</p>
      </footer>
    </main>
  );
}
