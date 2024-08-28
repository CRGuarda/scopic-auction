import { getLastBid, placeBidTransaction } from './queries'
import { validateAndParseBidData, validateBidRules, triggerAutoBidding } from './utils'

export const placeBid = async (formData: FormData, userName: string) => {
  const validatedData = validateAndParseBidData(formData)

  const lastBid = await getLastBid(validatedData.itemId)
  validateBidRules(lastBid, userName, validatedData.bidAmount)

  const newBidAmount = await placeBidTransaction(userName, validatedData.itemId, validatedData.bidAmount)

  // Trigger auto-bidding process
  await triggerAutoBidding(validatedData.itemId, newBidAmount)

  return { success: true, newBidAmount }
}
