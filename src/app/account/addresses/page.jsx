"use client"

import UserLayout from '@/components/layout/UserLayout'
import AddressManagement from '@/components/user/AddressManagement'
import useRouteGuard from '@/hooks/routeGuard';
import React from 'react'

function page() {
    useRouteGuard();
  return (
    <UserLayout>
        <AddressManagement />
    </UserLayout>
  )
}

export default page