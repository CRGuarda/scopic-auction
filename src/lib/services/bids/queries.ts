import { db } from '@/lib/db'
import { bids } from '@/lib/db/schemas/bids'
import { items } from '@/lib/db/schemas/items'
import { eq } from 'drizzle-orm'

export const getLastBid = async (itemId: string) => {
  return db.query.bids.findFirst({
    where: eq(bids.itemId, itemId),
    orderBy: (bids, { desc }) => desc(bids.bidAmount),
  })
}

export const placeBidTransaction = async (userName: string, itemId: string, newBid: number) => {
  return db.transaction(async (tx) => {
    // Place the bid
    await tx.insert(bids).values({ userName, itemId, bidAmount: newBid })

    // Update the item's current price
    await tx.update(items).set({ currentBid: newBid }).where(eq(items.id, itemId))

    return newBid
  })
}
