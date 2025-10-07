// pages/success.js
"use client";

import { CheckCircleIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function SuccessPage() {

  useEffect(() => {
     localStorage.setItem("cartCount", 0);
     useCartStore.getState().setCount(0);
     setTimeout(() => {
       window.location.href = '/';
     }, 5000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(/bg.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="h-12 mx-auto mb-8" />
          <CheckCircleIcon className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">การชำระเงินสำเร็จ!</h2>
          <p className="text-gray-600">การชำระเงินของคุณได้รับการดำเนินการสำเร็จ</p>
          <p className="text-gray-600">ขอบคุณสำหรับการสั่งซื้อของคุณ</p>
          <p className="text-gray-400 text-xs mt-4">ใบเสร็จจะถูกส่งไปที่อีเมลที่ระบุในขั้นตอนสั่งซื้อ</p>
        </div>
        <div className='flex justify-center'>
        <Link href="/" className={buttonVariants({variant: "default"})}>ไปที่หน้าหลัก</Link>
        </div>
      </div>
    </div>
  );
}
