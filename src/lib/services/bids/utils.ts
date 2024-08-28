import { validateInsertBidSchema } from '@/lib/db/schemas/bids'
import { processAutoBidding } from '@/lib/services/auto-bidding'
import { fromError } from 'zod-validation-error'

export const validateAndParseBidData = (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData.entries())
  const validateBidObject = validateInsertBidSchema(formDataObject)

  if (!validateBidObject.success) {
    throw new Error(fromError(validateBidObject.error).toString())
  }

  return validateBidObject.data
}

export const validateBidRules = (lastBid: any, currentUserName: string, newBidAmount: number) => {
  if (lastBid && lastBid.userName === currentUserName) {
    throw new Error("Can't bid twice in a row")
  }
  if (lastBid && lastBid.bidAmount >= newBidAmount) {
    throw new Error("Can't bid less than the current bid")
  }
}

export const triggerAutoBidding = async (itemId: string, currentPrice: number) => {
  try {
    await processAutoBidding(itemId, currentPrice)
  } catch (error: any) {
    console.error('Error triggering auto-bidding: ', error.message)
  }
}
