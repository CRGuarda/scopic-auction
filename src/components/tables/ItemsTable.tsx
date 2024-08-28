'use client'
import { useItems } from '@/hooks/useItems'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { getKeyValue } from '@nextui-org/react'
import { Pagination } from '@nextui-org/pagination'
import { Link } from '@nextui-org/link'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
import { stringSlicer } from '@/utils/string-slicer'
import { Eye, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { EditItemModal } from '@/components/modals/EditItemModal'
import { DeleteItemModal } from '@/components/modals/DeleteItemModal'

export const ItemsTable = ({ administrator }: { administrator?: boolean }) => {
  const { results, mutate, isLoading, page, totalPages, handlePageChange, sortController, handleOrder, setSearch } =
    useItems()

  return (
    <div className='flex flex-col w-full gap-8'>
      <Input
        type='search'
        label='Filter'
        onValueChange={setSearch}
        startContent={<MagnifyingGlass />}
        className='w-full max-w-md'
        classNames={{
          input: 'text-base',
        }}
      />
      <Table
        aria-label='Items table'
        sortDescriptor={sortController}
        onSortChange={handleOrder}
        className='w-full'
        bottomContent={
          totalPages > 0 ? (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={page}
                onChange={handlePageChange}
                total={totalPages}
              />
            </div>
          ) : null
        }
        classNames={{
          td: 'align-baseline',
        }}
      >
        <TableHeader>
          <TableColumn key='name'>Name</TableColumn>
          <TableColumn key='description'>Description</TableColumn>
          <TableColumn key='currentBid' allowsSorting>
            Current bid
          </TableColumn>
          {administrator ? (
            <TableColumn key='actions'>Actions</TableColumn>
          ) : (
            <TableColumn key='bidAction'>Bid action</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={results}
          isLoading={isLoading}
          loadingContent={<Spinner label='Loading...' />}
          emptyContent={'No rows to display.'}
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => {
                const cellValue = getKeyValue(item, columnKey)?.toString()
                if (columnKey === 'bidAction') {
                  return (
                    <TableCell>
                      <Button as={Link} href={`/item/${item.id}`}>
                        Bid now
                      </Button>
                    </TableCell>
                  )
                }
                if (columnKey === 'currentBid') {
                  return <TableCell>$ {stringSlicer(cellValue, 40)}</TableCell>
                }
                if (columnKey === 'actions') {
                  return (
                    <TableCell>
                      <Button as={Link} href={`/item/${item.id}`} variant='light' target='_blank' isIconOnly>
                        <Eye size={20} />
                      </Button>
                      <EditItemModal {...item} mutate={mutate} />
                      <DeleteItemModal itemId={item.id} mutate={mutate} />
                    </TableCell>
                  )
                }
                return <TableCell>{stringSlicer(cellValue, 40)}</TableCell>
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
