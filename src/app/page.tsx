import { SignOutButton } from '@/components/auth/SignOutButton'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center gap-y-8 p-24'>
      <h1>INICIO</h1>
      <div className='bg-red-300 dark:bg-blue-600'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab explicabo maxime quis quia illum expedita minima,
        alias quisquam et in sapiente beatae voluptatum recusandae sit eligendi perferendis facilis at praesentium!
      </div>
      <ThemeSwitcher />
      <SignOutButton />
    </main>
  )
}
