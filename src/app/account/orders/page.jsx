'use client'
import UserLayout from '@/components/layout/UserLayout'
import OrderHistory from '@/components/user/OrderHistory'
import React from 'react'
import useRouteGuard from "@/hooks/routeGuard";

function page() {
    useRouteGuard();
  return (
    <UserLayout>
      <OrderHistory />
    </UserLayout>
  )
}

export default page