'use client'

import { NextUIProvider } from '@nextui-org/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export const Providers = ({
  children,
  authSession,
}: {
  children: React.ReactNode
  authSession: Session | null | undefined
}) => {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <SessionProvider session={authSession}>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
