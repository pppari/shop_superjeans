'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('token')
    router.push('/signin')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center space-y-6 max-w-sm w-full animate-fade-in">
        <img src="/logo.png" alt="Logo" className="w-32" />
        <h2 className="text-xl font-semibold text-gray-700">กำลังออกจากระบบ...</h2>
        <Loader2 className="animate-spin text-gray-400" size={40} />
      </div>
    </div>
  )
}
