'use client'
import { CreateItemModal } from '@/components/modals/CreateItemModal'
import { ItemsTable } from '@/components/tables/ItemsTable'
import { useState } from 'react'

export const AdminDashboard = () => {
  const [key, setKey] = useState(0)
  return (
    <>
      <CreateItemModal setKey={setKey} />
      <ItemsTable administrator key={key} />
    </>
  )
}
