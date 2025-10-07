// /hooks/routeGuard.js
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useRouteGuard() {
  const router = useRouter()

  useEffect(() => {
    // กันเวลา hot-reload หรือกรณีพิเศษ
    if (typeof window === 'undefined') return

    const token = window.localStorage.getItem('token')
    if (!token) {
      router.replace('/signin')
    }
  }, [router])
}
