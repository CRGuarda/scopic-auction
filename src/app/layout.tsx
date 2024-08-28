import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils/utils'
import { Providers } from '@/providers/Providers'
import { MainNavbar } from '@/components/navbar/MainNavbar'
import { auth } from '@/lib/auth'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth()
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Providers authSession={session}>
          <MainNavbar />
          <ToastContainer
            position='top-left'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
            transition={Bounce}
          />
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
