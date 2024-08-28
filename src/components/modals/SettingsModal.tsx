'use client'
import { useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { GearSix } from '@phosphor-icons/react/dist/ssr'
import { BaseModal } from '@/components/modals/BaseModal'
import { AutoBiddingConfig } from '@/components/AutoBiddingConfig'

export const SettingsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button onPress={onOpen} color='primary' variant='light' className='p-0 px-2'>
        <GearSix size={20} /> Settings
      </Button>
      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange} title='Notifications table' size='xl' className='pb-8'>
        <AutoBiddingConfig />
      </BaseModal>
    </>
  )
}
