'use client'
import { KeyedMutator } from 'swr'
import { ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Pencil } from '@phosphor-icons/react/dist/ssr'
import { GetItemList, Item } from '@/types/item/item.type'
import { DatePickerCustom } from '@/components/DatePickerCustom'
import { useMutate } from '@/hooks/useMutate'
import { BaseModal } from '@/components/modals/BaseModal'
import { PriceInput } from '@/components/forms/item/ItemInputs'

type EditItemModal = Item & {
  mutate: KeyedMutator<GetItemList>
}

export const EditItemModal = ({
  mutate,
  id,
  name,
  description,
  currentBid,
  auctionStartTime,
  auctionEndTime,
}: EditItemModal) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { isLoading, handleMutate, error, randomKey } = useMutate(`/api/items?id=${id}`, 'PUT')
  return (
    <>
      <Button onPress={onOpen} color='primary' variant='light' isIconOnly>
        <Pencil size={20} />
      </Button>
      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange} title='Edit item'>
        {
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await handleMutate(new FormData(e.currentTarget)).then(() => {
                mutate()
                onClose()
              })
            }}
            key={randomKey}
          >
            <ModalBody>
              <Input label='Name' name='name' defaultValue={name} isRequired required />
              <Input label='Description' name='description' defaultValue={description} isRequired required />
              <PriceInput
                label='Current bid'
                name='currentBid'
                defaultValue={currentBid?.toString()}
                isRequired
                required
              />
              <DatePickerCustom
                label='Auction start time'
                name='auctionStartTime'
                defaultDate={auctionStartTime}
                minDate={auctionStartTime}
              />
              <DatePickerCustom
                label='Auction end time'
                defaultDate={auctionEndTime}
                minDate={auctionStartTime}
                name='auctionEndTime'
                isRequired
              />
            </ModalBody>
            <ModalFooter className='justify-center relative'>
              <Button type='submit' color='primary' className='w-max place-self-center' isLoading={isLoading}>
                Submit
              </Button>

              {error && <small className='text-tiny text-danger absolute -top-1 left-5'>{error}</small>}
            </ModalFooter>
          </form>
        }
      </BaseModal>
    </>
  )
}
