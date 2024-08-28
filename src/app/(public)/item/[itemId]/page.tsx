import { ItemDetails } from '@/components/ItemDetails'

const Page = ({
  params,
}: {
  params: {
    itemId: string
  }
}) => {
  return <ItemDetails itemId={params.itemId} />
}
export default Page
