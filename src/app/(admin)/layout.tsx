import { auth } from '@/lib/auth'
import { notFound } from 'next/navigation'

const AdminLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth()
  if (!session || !session.user.isAdmin) return notFound()

  return <main>{children}</main>
}
export default AdminLayout
