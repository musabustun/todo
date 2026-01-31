import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif', axes: ['SOFT', 'WONK', 'opsz'] })
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })

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
      <body className={clsx(serif.variable, sans.variable, 'bg-background min-h-screen antialiased font-sans text-foreground')}>
        {children}
      </body>
    </html>
  )
}
