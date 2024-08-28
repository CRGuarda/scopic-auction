import { deleteItem, getItemsCount, getItemsPage, insertItem, updateItem } from './queries'
import { buildWhereClause, buildOrderByClause, RESULTS_PER_PAGE, validateInsertItem, validateUpdateItem } from './utils'

export const getItemsService = async (searchParams: URLSearchParams) => {
  const id = searchParams.get('id')
  const order = searchParams.get('order') as 'asc' | 'desc' | null
  const page = Math.round(Number(searchParams.get('page')) || 1)
  const search = searchParams.get('search')

  const whereClause = buildWhereClause(id, search)
  const orderByClause = buildOrderByClause(order)

  const [itemsCount, results] = await Promise.all([
    getItemsCount(whereClause),
    getItemsPage(whereClause, orderByClause, page, id),
  ])

  return {
    results,
    totalPages: Math.ceil(itemsCount / RESULTS_PER_PAGE),
  }
}

export const createItemService = async (formData: FormData) => {
  const dataValidated = validateInsertItem(formData)

  const response = await insertItem(dataValidated)

  return response
}

export const updateItemService = async (formData: FormData, id?: string) => {
  if (!id) throw new Error('No id provided')

  const validatedData = validateUpdateItem(formData)
  return updateItem(id, validatedData)
}

export const deleteItemService = async (id?: string) => {
  if (!id) throw new Error('No id provided')

  const result = await deleteItem(id)
  if (result.changes === 0) throw new Error('No item found/deleted')

  return result
}
