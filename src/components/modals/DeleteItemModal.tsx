'use client'
import { KeyedMutator } from 'swr'
import { ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Trash } from '@phosphor-icons/react/dist/ssr'
import { GetItemList } from '@/types/item/item.type'
import { useMutate } from '@/hooks/useMutate'
import { BaseModal } from '@/components/modals/BaseModal'

type EditItemModal = {
  itemId: string
  mutate: KeyedMutator<GetItemList>
}

export const DeleteItemModal = ({ mutate, itemId }: EditItemModal) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { isLoading, handleMutate, error, randomKey } = useMutate(`/api/items?id=${itemId}`, 'DELETE')
  return (
    <>
      <Button onPress={onOpen} color='danger' variant='light' isIconOnly>
        <Trash size={20} />
      </Button>
      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange} title='Delete item'>
        {
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await handleMutate().then(() => {
                mutate()
                onClose()
              })
            }}
            key={randomKey}
          >
            <ModalBody>Are you sure you want to delete this item?</ModalBody>
            <ModalFooter className='justify-center relative'>
              <Button type='submit' color='danger' className='w-max place-self-center' isLoading={isLoading}>
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
