import { relations } from 'drizzle-orm'
import { text, sqliteTable, int, index } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { autoBiddingItems } from '@/lib/db/schemas/auto-bidding-items'
import { bids } from '@/lib/db/schemas/bids'
import { createdAt, uniqueID, updatedAt } from '@/utils/columns-definition'

export const items = sqliteTable(
  'items',
  {
    id: uniqueID(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    currentBid: int('current_bid', { mode: 'number' }).notNull(),
    auctionStartTime: int('auction_start_time', { mode: 'timestamp' })
      .$default(() => new Date())
      .notNull(),
    auctionEndTime: int('auction_end_time', { mode: 'timestamp' }).notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (t) => ({
    startingPriceIndex: index('starting_price_index').on(t.currentBid),
    startingPriceDescIndex: index('starting_price_and_id_index').on(t.currentBid, t.id),
  })
)

export const itemsRelations = relations(items, ({ many }) => ({
  bids: many(bids),
  autoBiddingItems: many(autoBiddingItems),
}))

export const insertItemSchema = createInsertSchema(items, {
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  currentBid: z.coerce.number().min(1),
  auctionStartTime: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
  auctionEndTime: z
    .string()
    .datetime()
    .transform((date) => new Date(date)),
})

// SAFE PARSE EXPORTS
export const validateInsertItemSchema = (object: unknown) =>
  insertItemSchema
    .pick({
      name: true,
      description: true,
      currentBid: true,
      auctionStartTime: true,
      auctionEndTime: true,
    })
    .safeParse(object)
export const validateUpdateItemSchema = (object: unknown) =>
  insertItemSchema
    .pick({
      name: true,
      description: true,
      currentBid: true,
      auctionStartTime: true,
      auctionEndTime: true,
    })
    .partial()
    .safeParse(object)
