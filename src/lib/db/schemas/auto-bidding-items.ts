import { createdAt, uniqueID } from '@/utils/columns-definition'
import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm'
import { items } from '@/lib/db/schemas/items'

export const autoBiddingItems = sqliteTable('auto_bidding_items', {
  id: uniqueID(),
  userName: text('user_name').notNull(),
  itemId: text('item_id')
    .notNull()
    .references(() => items.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  isActive: int('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: createdAt(),
})

export const autoBiddingItemsRelations = relations(autoBiddingItems, ({ one }) => ({
  item: one(items, {
    fields: [autoBiddingItems.itemId],
    references: [items.id],
  }),
}))
