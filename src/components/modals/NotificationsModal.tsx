'use client'
import { useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Bell } from '@phosphor-icons/react/dist/ssr'
import { BaseModal } from '@/components/modals/BaseModal'
import { NotificationElement } from '@/types/notification/notification.type'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'

type NotificationsModalProps = {
  notifications: NotificationElement[]
}

export const NotificationsModal = ({ notifications }: NotificationsModalProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button onPress={onOpen} color='primary' variant='light' className='p-0 px-2'>
        <Bell size={20} /> Notifications
      </Button>
      <BaseModal isOpen={isOpen} onOpenChange={onOpenChange} title='Notifications table' size='xl'>
        <Table
          aria-label='Bids history table'
          className='w-max mx-auto py-8 text-xs'
          classNames={{
            emptyWrapper: 'h-24',
            th: 'px-8',
            td: 'text-center',
          }}
        >
          <TableHeader>
            <TableColumn>Message</TableColumn>
            <TableColumn>Message Type</TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No notifications to display.'}>
            {notifications.map(({ id, message, type }) => {
              return (
                <TableRow key={id} className='first:bg-primary-50'>
                  <TableCell>{message}</TableCell>
                  <TableCell> {type}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </BaseModal>
    </>
  )
}
