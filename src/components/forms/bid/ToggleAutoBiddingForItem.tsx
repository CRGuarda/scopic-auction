'use client'
import { useFetcher } from '@/hooks/useFetcher'
import { useMutate } from '@/hooks/useMutate'
import { GetActiveAutoBiddingItem } from '@/types/bid/bid.type'
import { GetItemList } from '@/types/item/item.type'
import { Checkbox } from '@nextui-org/checkbox'
import { useEffect, useState } from 'react'
import { KeyedMutator } from 'swr'

export const ToggleAutoBiddingForItem = ({ itemId, mutate }: { itemId: string; mutate: KeyedMutator<GetItemList> }) => {
  const { data } = useFetcher<GetActiveAutoBiddingItem>('/api/auto-bidding-items')
  const [isChecked, setIsChecked] = useState(false)
  const { isLoading, handleMutate } = useMutate('/api/auto-bidding-items?itemId=' + itemId, 'POST')

  const handleChecked = async () => {
    setIsChecked((prevState) => !prevState)
    handleMutate()
    mutate()
  }

  useEffect(() => {
    data && setIsChecked(Boolean(data.items.find((item) => item.itemId === itemId)?.isActive))
  }, [data, itemId])

  return (
    <div className='relative h-max'>
      <Checkbox
        type='checkbox'
        isSelected={isChecked}
        onValueChange={handleChecked}
        disabled={isLoading}
        className='h-max'
      >
        <span className='text-xs'>Auto-bidding for this item</span>
      </Checkbox>{' '}
      <span className='text-warning absolute -bottom-8 left-4 text-[9px] leading-none'>
        Please check if you already configured auto-bidding params in the settings
      </span>
    </div>
  )
}
