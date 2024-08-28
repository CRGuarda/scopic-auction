'use client'
import { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar'
import { Link, LinkProps } from '@nextui-org/link'
import { Gavel } from '@phosphor-icons/react/dist/ssr'
import { usePathname } from 'next/navigation'
import { AvatarMenu } from '@/components/navbar/AvatarMenu'
import { useSession } from 'next-auth/react'

export const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data } = useSession()

  const menuItems = [
    {
      name: 'Home',
      href: '/',
      isProtected: false,
    },
    {
      name: ' Admin Dashboard',
      href: '/dashboard',
      isProtected: true,
    },
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <NavbarBrand>
          <Link href='/' color='foreground' className='flex items-center gap-1 lg:gap-2'>
            <Gavel size={24} />
            <p className='font-bold text-inherit'>
              Scopic<span className='text-sky-800'>Auction</span>
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map(({ name, href, isProtected }, index) => {
          if (isProtected && !data?.user?.isAdmin) return null
          const linkColor: LinkProps['color'] = isProtected ? 'success' : 'foreground'
          return (
            <NavbarItem key={`${name}-${index}`} isActive={pathname === href}>
              <Link href={href} aria-current={pathname === href ? 'page' : undefined} color={linkColor}>
                {name}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <AvatarMenu />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ name, href, isProtected }, index) => {
          if (isProtected && !data?.user?.isAdmin) return null
          const linkColor: LinkProps['color'] = isProtected ? 'success' : 'foreground'
          return (
            <NavbarMenuItem key={`${name}-${index}`}>
              <Link
                color={linkColor}
                className='w-full'
                href={href}
                size='lg'
                aria-current={pathname === href ? 'page' : undefined}
              >
                {name}
              </Link>
            </NavbarMenuItem>
          )
        })}
      </NavbarMenu>
    </Navbar>
  )
}
