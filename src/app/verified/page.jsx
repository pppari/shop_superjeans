import { Button, buttonVariants } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AccountVerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold mb-2">ยืนยันบัญชีสำเร็จ</h1>
        <p className="text-gray-600 mb-6">
          บัญชีของคุณได้รับการยืนยันเรียบร้อยแล้ว คุณสามารถเข้าสู่ระบบเพื่อเริ่มต้นใช้งานได้เลย
        </p>
        <Link href="/signin" className={buttonVariants({variant: 'default'})}>
          เข้าสู่ระบบ
        </Link>
      </div>
    </div>
  )
}
