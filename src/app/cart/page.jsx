'use client'
import CartPage from '@/components/Cart'
import MainLayout from '@/components/layout/main'
import useRouteGuard from '@/hooks/routeGuard'
import React from 'react'

function page() {
  useRouteGuard();
  return (
    <MainLayout>
        <CartPage />
    </MainLayout>
  )
}

export default page