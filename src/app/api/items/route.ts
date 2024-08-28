import type { NextRequest } from 'next/server'
import { createItemService, deleteItemService, getItemsService, updateItemService } from '@/lib/services/items'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const result = await getItemsService(searchParams)

    return Response.json(result)
  } catch (error: any) {
    return Response.json(error.message, {
      status: 400,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const result = await createItemService(formData)
    return Response.json(result)
  } catch (error: any) {
    return Response.json(error.message, {
      status: 400,
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const formData = await request.formData()

    const itemUpdated = await updateItemService(formData, id!)
    return Response.json(itemUpdated)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const result = await deleteItemService(id!)
    return Response.json(result)
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
