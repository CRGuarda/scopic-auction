import { ItemsTable } from '@/components/tables/ItemsTable'
import { PageTitle } from '@/components/ui/PageTitle'

export default function Home() {
  return (
    <main className='flex flex-col items-center gap-y-8 py-8 lg:py-12 px-4 lg:px-8'>
      <PageTitle>Item bids gallery</PageTitle>
      <ItemsTable />
    </main>
  )
}
