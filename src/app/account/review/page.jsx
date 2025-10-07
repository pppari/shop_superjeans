"use client"

import MainLayout from '@/components/layout/main'
import UserReviewManager from '@/components/user/ReviewManager'
import React from 'react'

function page() {
  return (
    <MainLayout>
        <UserReviewManager />
    </MainLayout>
  )
}

export default page