import { items, validateInsertItemSchema, validateUpdateItemSchema } from '@/lib/db/schemas/items'
import { and, or, eq, like, desc, asc } from 'drizzle-orm'
import { fromError } from 'zod-validation-error'

export const RESULTS_PER_PAGE = 10

export const buildWhereClause = (id: string | null, search: string | null) =>
  and(
    eq(items.id, id || items.id),
    or(
      like(items.name, search ? `%${search}%` : items.name),
      like(items.description, search ? `%${search}%` : items.description)
    )
  )

export const buildOrderByClause = (order: 'asc' | 'desc' | null) => [
  order === 'desc' ? desc(items.currentBid) : order === 'asc' ? asc(items.currentBid) : desc(items.createdAt),
  order === 'desc' ? desc(items.name) : order === 'asc' ? asc(items.name) : desc(items.createdAt),
]

export const validateInsertItem = (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData.entries())

  const validateItemObject = validateInsertItemSchema(formDataObject)
  if (!validateItemObject.success) throw new Error(fromError(validateItemObject.error).toString())

  const { data } = validateItemObject
  return data
}

export const validateUpdateItem = (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData.entries())
  const validateItemObject = validateUpdateItemSchema(formDataObject)

  if (!validateItemObject.success) {
    throw new Error(fromError(validateItemObject.error).toString())
  }

  return validateItemObject.data
}
