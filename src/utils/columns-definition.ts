import { integer, text } from 'drizzle-orm/sqlite-core'

export const uniqueID = () =>
  text('id', { length: 36 })
    .primaryKey()
    .$default(() => crypto.randomUUID())

export const createdAt = () =>
  integer('created_at', { mode: 'timestamp' })
    .$default(() => new Date())
    .notNull()
export const updatedAt = () =>
  integer('updated_at', { mode: 'timestamp' })
    .$onUpdate(() => new Date())
    .notNull()
