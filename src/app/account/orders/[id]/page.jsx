'use client'

import MainLayout from '@/components/layout/main';
import SingleOrder from '@/components/user/SingleOrder';
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
    const { id } = useParams(); // dynamic route /order/[id]
  return (
    <MainLayout>
        <SingleOrder id={id} />
    </MainLayout>
  )
}

export default page