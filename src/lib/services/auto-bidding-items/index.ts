import {
  getAutoBiddingItemsForUser,
  getAutoBiddingItemForUserAndItem,
  createAutoBiddingItem,
  updateAutoBiddingItemStatus,
  deleteAutoBiddingItem,
} from './queries'
import { validateAutoBiddingItemInput, formatAutoBiddingItemResponse } from './utils'

export const getAutoBiddingItems = async (userName: string) => {
  const items = await getAutoBiddingItemsForUser(userName)
  return items.map(formatAutoBiddingItemResponse)
}

export const toggleAutoBiddingForItem = async (userName: string, itemId: string) => {
  const validationError = validateAutoBiddingItemInput(userName, itemId)
  if (validationError) {
    throw new Error(validationError)
  }

  const existingItem = await getAutoBiddingItemForUserAndItem(userName, itemId)

  if (existingItem) {
    const updatedItem = await updateAutoBiddingItemStatus(existingItem.id, !existingItem.isActive)
    return formatAutoBiddingItemResponse(updatedItem)
  } else {
    const newItem = await createAutoBiddingItem(userName, itemId)
    return formatAutoBiddingItemResponse(newItem)
  }
}

export const removeAutoBiddingForItem = async (id: string) => {
  const deletedItem = await deleteAutoBiddingItem(id)
  if (!deletedItem) {
    throw new Error('Auto-bidding item not found')
  }
  return formatAutoBiddingItemResponse(deletedItem)
}
