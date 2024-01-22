import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/components/Providers/providers'
import { cn, constructMetadata } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className,"bg-softLight dark:bg-darkBlack")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}