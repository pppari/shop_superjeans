// pages/success.js
"use client";

import { XCircle } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useEffect } from 'react';
import Link from 'next/link';

export default function CanclePage() {

  useEffect(() => {
     setTimeout(() => {
       window.location.href = '/';
     }, 5000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url(/bg.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="h-12 mx-auto mb-8" />
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">การชำระเงินถูกยกเลิก</h2>
          <p className="text-gray-600">หากเกิดข้อผิดพลาดกรุณาติดต่อร้านค้า</p>
        </div>
        <div className='flex justify-center'>
        <Link href="/" className={buttonVariants({variant: "default"})}>ไปที่หน้าหลัก</Link>
        </div>
      </div>
    </div>
  );
}
