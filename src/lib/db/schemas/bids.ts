import { createdAt, uniqueID, updatedAt } from '@/utils/columns-definition'
import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { items } from '@/lib/db/schemas/items'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const bids = sqliteTable('bids', {
  id: uniqueID(),
  itemId: text('item_id')
    .references(() => items.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  userName: text('user_name').notNull(),
  bidAmount: int('bid_amount', { mode: 'number' }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

export const bidsRelations = relations(bids, ({ one }) => ({
  item: one(items, {
    fields: [bids.itemId],
    references: [items.id],
  }),
}))

export const insertBidSchema = createInsertSchema(bids, {
  bidAmount: z.coerce.number().min(1),
})

// SAFE PARSE EXPORTS
export const validateInsertBidSchema = (object: unknown) =>
  insertBidSchema
    .pick({
      itemId: true,
      userName: true,
      bidAmount: true,
    })
    .safeParse(object)

export const validateUpdateBidSchema = (object: unknown) =>
  insertBidSchema
    .pick({
      itemId: true,
      userName: true,
      bidAmount: true,
    })
    .partial()
    .safeParse(object)
