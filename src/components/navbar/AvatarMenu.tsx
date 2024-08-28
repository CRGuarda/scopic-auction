'use client'
import { signOutAction } from '@/actions/auth-actions'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { Avatar } from '@nextui-org/avatar'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Badge } from '@nextui-org/badge'
import { useSession } from 'next-auth/react'
import { useTransition } from 'react'
import { useFetcher } from '@/hooks/useFetcher'
import { Notifications } from '@/types/notification/notification.type'
import { NotificationsModal } from '@/components/modals/NotificationsModal'
import { SettingsModal } from '@/components/modals/SettingsModal'

export const AvatarMenu = () => {
  const { data } = useSession()
  const [pending, startTransition] = useTransition()
  const { data: notifications } = useFetcher<Notifications>('/api/notifications')

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <div>
          {notifications?.notifications && notifications?.notifications?.length > 0 ? (
            <Badge content={notifications?.notifications.length} color='primary'>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                name={data?.user?.name}
                size='sm'
                src={`https://avatar.vercel.sh/${data?.user?.name}?size=30`}
              />
            </Badge>
          ) : (
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name={data?.user?.name}
              size='sm'
              src={`https://avatar.vercel.sh/${data?.user?.name}?size=30`}
            />
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Profile Actions'
        disabledKeys={[pending ? 'logout' : '']}
        variant='flat'
        onAction={(key) => {
          startTransition(async () => {
            key === 'logout' && (await signOutAction())
          })
        }}
      >
        <DropdownItem key='profile' className='h-14 gap-2' isReadOnly textValue='Profile info'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>{data?.user?.name ?? ''}</p>
            </div>
            <ThemeSwitcher />
          </div>
        </DropdownItem>
        <DropdownItem key='notifications' textValue='Notifications' isReadOnly>
          <NotificationsModal notifications={notifications?.notifications || []} />
        </DropdownItem>
        <DropdownItem key='bid_settings' textValue='Settings' isReadOnly>
          <SettingsModal />
        </DropdownItem>
        <DropdownItem key='logout' color='danger' textValue='Log Out'>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
