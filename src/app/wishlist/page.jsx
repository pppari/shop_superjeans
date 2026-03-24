import MainLayout from '@/components/layout/main'
import WishlistPage from '@/components/WishList'
import React from 'react'

function page() {
  return (
    <MainLayout>
      <div className="flex bg-slate-100 px-4">
        <WishlistPage />
        </div>
    </MainLayout>
  )
}

export default page