'use client'
import { DatePickerCustom } from '@/components/DatePickerCustom'
import { PriceInput } from '@/components/forms/item/ItemInputs'
import { useMutate } from '@/hooks/useMutate'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'

export const CreateItemForm = () => {
  const { isLoading, handleMutate, error, randomKey } = useMutate('/api/items', 'POST')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleMutate(new FormData(e.currentTarget))
      }}
      key={randomKey}
      className='relative'
    >
      <Input label='Name' name='name' isRequired required />
      <Input label='Description' name='description' isRequired required />
      <PriceInput label='Starting price' name='startingPrice' isRequired required />
      <DatePickerCustom label='Auction end time' name='auctionEndTime' isRequired />
      <Button type='submit' isLoading={isLoading}>
        Submit
      </Button>
      {error && <small className='text-tiny text-danger absolute -bottom-8 left-5'>{error}</small>}
    </form>
  )
}
