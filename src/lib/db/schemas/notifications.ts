import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createdAt, uniqueID } from '@/utils/columns-definition'

export const notifications = sqliteTable('notifications', {
  id: uniqueID(),
  userName: text('user_name').notNull(),
  message: text('message').notNull(),
  type: text('type').notNull(),
  isRead: integer('is_read', { mode: 'boolean' }).notNull().default(false),
  createdAt: createdAt(),
})
