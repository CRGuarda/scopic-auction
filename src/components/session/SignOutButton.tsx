'use client'
import { signOutAction } from '@/actions/auth-actions'
import { Button } from '@nextui-org/button'

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button type='submit'>Sign Out</Button>
    </form>
  )
}
