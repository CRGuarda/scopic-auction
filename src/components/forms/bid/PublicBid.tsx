'use client'
import { PriceInput } from '@/components/forms/item/ItemInputs'
import { useMutate } from '@/hooks/useMutate'
import { GetItemList } from '@/types/item/item.type'
import { Button } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { KeyedMutator } from 'swr'

export const PublicBid = ({
  startingPrice,
  itemId,
  mutate,
}: {
  startingPrice: number
  itemId: string
  mutate: KeyedMutator<GetItemList>
}) => {
  const [value, setValue] = useState('')
  const { data } = useSession()
  const { isLoading, handleMutate } = useMutate('/api/bids', 'POST')

  return (
    <form
      className='flex flex-col items-center justify-center gap-2'
      onSubmit={(e) => {
        e.preventDefault()
        handleMutate(new FormData(e.currentTarget)).then(() => {
          mutate()
        })
      }}
    >
      <PriceInput label='Bid' name='bidAmount' getValueChanged={setValue} />
      <input type='hidden' name='itemId' value={itemId} />
      <input type='hidden' name='userName' value={data?.user?.name} />
      <Button isDisabled={Number(value) < startingPrice + 1} type='submit' isLoading={isLoading}>
        Submit bid
      </Button>
    </form>
  )
}
