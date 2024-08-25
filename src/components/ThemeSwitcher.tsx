'use client'

import { Button } from '@nextui-org/button'
import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  if (!isClientSide) return <div className='size-10' />

  const isDarkMode = resolvedTheme === 'dark'

  return (
    <Button onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} isIconOnly variant='light' title='Change theme'>
      {isDarkMode ? <Sun size={24} weight='fill' /> : <Moon size={24} weight='fill' />}
    </Button>
  )
}
