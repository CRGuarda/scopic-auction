import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { placeBid } from '@/lib/services/bids'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) throw new Error('No session provided')

    const formData = await request.formData()

    const response = await placeBid(formData, session.user.name)

    return Response.json(response)
  } catch (error: any) {
    return Response.json(error.message, { status: 400 })
  }
}
