import { text, int, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createdAt, uniqueID, updatedAt } from '@/utils/columns-definition'

export const autoBiddingConfig = sqliteTable('auto_bidding_config', {
  id: uniqueID(),
  userName: text('user_name').notNull().unique(),
  maxBidAmount: int('max_bid_amount', { mode: 'number' }).notNull(),
  alertPercentage: int('alert_percentage', { mode: 'number' }).notNull(),
  reservedAmount: int('reserved_amount', { mode: 'number' }).notNull().default(0),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})
