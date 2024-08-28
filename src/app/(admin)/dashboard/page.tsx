import { AdminDashboard } from '@/components/AdminDashboard'
import { PageTitle } from '@/components/ui/PageTitle'

const Page = () => {
  return (
    <section className='flex flex-col gap-4 w-full px-8 max-w-5xl mx-auto'>
      <PageTitle>Administrator Table</PageTitle>
      <AdminDashboard />
    </section>
  )
}
export default Page
