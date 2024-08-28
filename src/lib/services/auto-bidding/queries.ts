import { db } from '@/lib/db'
import { autoBiddingConfig } from '@/lib/db/schemas/auto-bidding-config'
import { autoBiddingItems } from '@/lib/db/schemas/auto-bidding-items'
import { bids } from '@/lib/db/schemas/bids'
import { items } from '@/lib/db/schemas/items'
import { eq, and, gt, sql } from 'drizzle-orm'

export const getAutoBidders = async (itemId: string, currentPrice: number) => {
  return db
    .select({
      userName: autoBiddingConfig.userName,
      maxBidAmount: autoBiddingConfig.maxBidAmount,
      alertPercentage: autoBiddingConfig.alertPercentage,
    })
    .from(autoBiddingConfig)
    .innerJoin(autoBiddingItems, eq(autoBiddingConfig.userName, autoBiddingItems.userName))
    .where(
      and(
        eq(autoBiddingItems.itemId, itemId),
        eq(autoBiddingItems.isActive, true),
        gt(autoBiddingConfig.maxBidAmount, currentPrice)
      )
    )
    .all()
}

export const getUserTotalBids = async (userName: string) => {
  const [result] = await db
    .select({ total: sql<number>`SUM(${bids.bidAmount})` })
    .from(bids)
    .where(eq(bids.userName, userName))

  return result?.total || 0
}

export const placeBidTransaction = async (userName: string, itemId: string, amount: number) => {
  return db.transaction(async (tx) => {
    await tx.insert(bids).values({ userName, itemId, bidAmount: amount })
    await tx.update(items).set({ currentBid: amount }).where(eq(items.id, itemId))
    return amount
  })
}

export const getAutoBiddingConfig = async (userName: string) => {
  return db.select().from(autoBiddingConfig).where(eq(autoBiddingConfig.userName, userName)).get()
}

export const updateAutoBiddingConfig = async (userName: string, maxBidAmount: number, alertPercentage: number) => {
  return db
    .update(autoBiddingConfig)
    .set({ maxBidAmount, alertPercentage, reservedAmount: 0 })
    .where(eq(autoBiddingConfig.userName, userName))
}

export const updateReservedAmount = async (userName: string, amount: number) => {
  return await db
    .update(autoBiddingConfig)
    .set({
      reservedAmount: sql`${autoBiddingConfig.reservedAmount} + ${amount}`,
      updatedAt: new Date(),
    })
    .where(eq(autoBiddingConfig.userName, userName))
    .returning({ newReservedAmount: autoBiddingConfig.reservedAmount })
}

export const getAvailableBidAmount = async (userName: string) => {
  const config = await getAutoBiddingConfig(userName)
  if (!config) throw new Error('Auto-bidding configuration not found')
  return config.maxBidAmount - config.reservedAmount
}
