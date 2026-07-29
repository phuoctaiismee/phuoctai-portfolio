import type { Metadata } from 'next'
import './globals.css'
import { sanityFetch, SanityLive } from '@/lib/sanity/live'
import { cn } from '@/utils/cn'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import NavigationBar from '@/components/layout/navigation-bar'
import FooterBar from '@/components/layout/footer-bar'
import CustomCursor from '@/components/shared/custom-cursor'
import { PROFILE_QUERY, APP_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { ProfileData, AppSettingsData } from '@/core/entities'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'PhuocTai | Software Engineer',
    template: '%s | PhuocTai',
  },
  description: 'Software engineer portfolio of PhuocTai — building modern web applications with React, Next.js, and Node.js.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PhuocTai Portfolio',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [
    { data: profile },
    { data: appSettings }
  ] = (await Promise.all([
    sanityFetch({ query: PROFILE_QUERY }),
    sanityFetch({ query: APP_SETTINGS_QUERY }),
  ])) as [{ data: ProfileData | null }, { data: AppSettingsData | null }]

  return (
    <html
      lang="en"
      className={cn(inter.variable, 'h-full antialiased')}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {/* Main Content Wrapper (covers the footer and slides up on scroll) */}
        <div className="relative z-10 bg-background min-h-screen mb-[100vh] shadow-2xl">
          <NavigationBar
            navLinks={appSettings?.navLinks}
            logoText={appSettings?.logoText}
            copyrightName={appSettings?.copyrightName || profile?.displayName}
          />
          <main className="flex flex-col flex-1">{children}</main>
        </div>
        <FooterBar profile={profile} appSettings={appSettings} />

        <CustomCursor />
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
