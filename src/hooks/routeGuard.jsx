'use client'

import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'

export default function useRouteGuard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/signin')
    }
  }, [router])
}
