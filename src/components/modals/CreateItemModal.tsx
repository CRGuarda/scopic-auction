'use client'
import { ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import { DatePickerCustom } from '@/components/DatePickerCustom'
import { useMutate } from '@/hooks/useMutate'
import { PriceInput } from '@/components/forms/item/ItemInputs'
import { useEffect } from 'react'
import { BaseModal } from '@/components/modals/BaseModal'

export const CreateItemModal = ({ setKey }: { setKey: (randomKey: number) => void }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { isLoading, handleMutate, error, randomKey } = useMutate('/api/items', 'POST')

  useEffect(() => {
    setKey(randomKey)
  }, [randomKey, setKey])

  return (
    <>
      <Button onPress={onOpen} color='primary' variant='light' className='w-max px-2'>
        <Plus size={20} /> Crear ítem
      </Button>
      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange} title='Create item'>
        {
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleMutate(new FormData(e.currentTarget)).then(() => onClose())
            }}
            key={randomKey}
          >
            <ModalBody>
              <Input label='Name' name='name' isRequired required />
              <Input label='Description' name='description' isRequired required />
              <PriceInput label='Initial price' name='currentBid' isRequired required />
              <DatePickerCustom label='Auction start time' name='auctionStartTime' />
              <DatePickerCustom label='Auction end time' name='auctionEndTime' isRequired />
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
