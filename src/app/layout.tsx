import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: 'Reflect - Haftalık Planlama & Refleksiyon',
  description: 'Minimal ve estetik bir haftalık refleksiyon todo listesi.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={clsx(inter.variable, jakarta.variable, 'bg-background min-h-screen antialiased')}>
        {children}
      </body>
    </html>
  )
}
