'use client'
import { useEffect, useState } from 'react'
import NextImage from 'next/image'
import { useItems } from '@/hooks/useItems'
import { Image } from '@nextui-org/image'
import { useSession } from 'next-auth/react'
import { PageTitle } from '@/components/ui/PageTitle'
import { CustomCountDown } from '@/components/countdown/CustomCountDown'
import { PublicBid } from '@/components/forms/bid/PublicBid'
import { ToggleAutoBiddingForItem } from '@/components/forms/bid/ToggleAutoBiddingForItem'
import { BidsHistory } from '@/components/BidsHistory'
import { notFound } from 'next/navigation'

export const ItemDetails = ({ itemId }: { itemId: string }) => {
  const [bidDisabled, setBidDisabled] = useState(false)
  const { data } = useSession()
  const { isLoading, results, bids, error, setId, mutate } = useItems()

  useEffect(() => {
    setId(itemId)
  }, [setId])

  if (isLoading) return <div>Loading...</div>
  if (error || (!isLoading && !results.length)) return notFound()
  return (
    <section className='flex flex-col gap-4 w-full px-8 max-w-5xl mx-auto pt-8 pb-12'>
      {results.map(({ id, name, description, currentBid, auctionEndTime }) => {
        return (
          <div key={id} className='flex flex-col gap-4'>
            <PageTitle>{name}</PageTitle>
            <hr />
            <p>{description}</p>
            <hr />
            <Image
              as={NextImage}
              src={`https://picsum.photos/seed/${id}/300`}
              alt={`${name} image`}
              priority
              width={300}
              height={300}
              classNames={{
                wrapper: 'place-self-center',
              }}
            />
            <span className='text-2xl md:text-3xl font-bold pb-4'>
              Current bid: <span className='font-bold text-primary'>$ {currentBid}</span>
            </span>
            <div className='flex w-full justify-evenly flex-col md:flex-row gap-y-4'>
              {!data?.user?.isAdmin && (
                <>
                  <CustomCountDown date={auctionEndTime} onComplete={() => setBidDisabled(true)} />
                  {!bidDisabled && (
                    <div className='flex w-max gap-4 flex-col md:flex-row pb-12 md:pb-0'>
                      <PublicBid startingPrice={currentBid} itemId={id} mutate={mutate} />
                      <ToggleAutoBiddingForItem itemId={id} mutate={mutate} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
      <BidsHistory bids={bids} />
    </section>
  )
}
