'use client'

import { FormEvent } from 'react'
import { Card, CardBody, CardHeader, Button, Slider } from '@nextui-org/react'
import { useFetcher } from '@/hooks/useFetcher'
import { AutoBidConfig } from '@/types/bid/bid.type'
import { useMutate } from '@/hooks/useMutate'
import { PriceInput } from '@/components/forms/item/ItemInputs'

export const AutoBiddingConfig = () => {
  const { data, isLoading: fetcherLoading, mutate } = useFetcher<AutoBidConfig>('/api/auto-bidding')
  const { isLoading, handleMutate } = useMutate('/api/auto-bidding', 'POST')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    handleMutate(formData).then(() => mutate())
  }

  if (fetcherLoading)
    return (
      <div className='w-full'>
        <span className='text-center'>Loading...</span>
      </div>
    )
  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col'>
          <p className='text-md'>Auto-Bidding Configuration</p>
          <p className='text-small text-default-500'>Set your auto-bidding preferences</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <PriceInput
            name='maxBidAmount'
            label='Maximum Bid Amount'
            placeholder='Enter maximum bid amount'
            defaultValue={data?.config.maxBidAmount.toString()}
            required
          />
          <div className='space-y-2'>
            <Slider
              id='alertPercentage'
              name='alertPercentage'
              size='sm'
              label='Alert Percentage'
              step={1}
              defaultValue={data?.config.alertPercentage}
              maxValue={100}
              minValue={1}
              className='max-w-md'
            />
          </div>
          <span className='italix text-[9px] text-danger'>
            When this params changes, the reserved amount will be reset.
          </span>
          <Button type='submit' color='primary' isLoading={isLoading}>
            {isLoading ? 'Updating...' : 'Update Configuration'}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
