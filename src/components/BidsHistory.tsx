import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { Bid } from '@/types/bid/bid.type'

export const BidsHistory = ({ bids }: { bids: Bid[] }) => {
  return (
    <section className='place-self-center flex w-full flex-col gap-4 items-center pt-8'>
      <h2 className='text-2xl uppercase font-bold'>Bids history</h2>
      <Table
        aria-label='Bids history table'
        className='w-max'
        classNames={{
          emptyWrapper: 'h-24',
          th: 'px-8',
          td: 'text-center',
        }}
      >
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Bid amount</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>
          {bids.map(({ id, userName, bidAmount }) => {
            return (
              <TableRow key={id} className='first:bg-primary-50'>
                <TableCell>{userName}</TableCell>
                <TableCell> $ {bidAmount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}
