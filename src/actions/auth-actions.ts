'use server'

import { signOut } from '@/lib/auth'

export const signOutAction = async () => {
  'use server'
  await signOut()
}
