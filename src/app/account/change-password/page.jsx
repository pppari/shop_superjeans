"use client"

import { ChangePasswordForm } from '@/components/ChangePsw-form'
import MainLayout from '@/components/layout/main'
import { Card } from '@/components/ui/card';
import useRouteGuard from '@/hooks/routeGuard';
import React from 'react'

function page() {
      useRouteGuard();
  return (
    <MainLayout>
        <div className="mx-16 p-8">
        <ChangePasswordForm />
        </div>
    </MainLayout>
  )
}

export default page