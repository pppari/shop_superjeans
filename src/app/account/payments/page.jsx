"use client"

import UserLayout from '@/components/layout/UserLayout'
import PaymentHistory from '@/components/user/PaymentHistory'
import useRouteGuard from '@/hooks/routeGuard';
import React from 'react'

function page() {
    useRouteGuard();
  return (
    <UserLayout>
        <PaymentHistory />
    </UserLayout>
  )
}

export default page