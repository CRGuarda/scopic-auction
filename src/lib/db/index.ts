import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { items, itemsRelations } from '@/lib/db/schemas/items'
import { bids, bidsRelations } from '@/lib/db/schemas/bids'
import { autoBiddingItems, autoBiddingItemsRelations } from '@/lib/db/schemas/auto-bidding-items'
import { autoBiddingConfig } from '@/lib/db/schemas/auto-bidding-config'
import { notifications } from '@/lib/db/schemas/notifications'

const sqlite = new Database('sqlite.db')
export const db = drizzle(sqlite, {
  schema: {
    items,
    itemsRelations,
    bids,
    bidsRelations,
    autoBiddingItems,
    autoBiddingItemsRelations,
    autoBiddingConfig,
    notifications,
  },
})
