import { db } from '@/lib/db'
import { autoBiddingItems } from '@/lib/db/schemas/auto-bidding-items'
import { eq, and } from 'drizzle-orm'

export const getAutoBiddingItemsForUser = async (userName: string) => {
  return db.select().from(autoBiddingItems).where(eq(autoBiddingItems.userName, userName)).all()
}

export const getAutoBiddingItemForUserAndItem = async (userName: string, itemId: string) => {
  return db
    .select()
    .from(autoBiddingItems)
    .where(and(eq(autoBiddingItems.userName, userName), eq(autoBiddingItems.itemId, itemId)))
    .get()
}

export const createAutoBiddingItem = async (userName: string, itemId: string) => {
  return db.insert(autoBiddingItems).values({ userName, itemId }).returning().get()
}

export const updateAutoBiddingItemStatus = async (id: string, isActive: boolean) => {
  return db.update(autoBiddingItems).set({ isActive }).where(eq(autoBiddingItems.id, id)).returning().get()
}

export const deleteAutoBiddingItem = async (id: string) => {
  return db.delete(autoBiddingItems).where(eq(autoBiddingItems.id, id)).returning().get()
}
