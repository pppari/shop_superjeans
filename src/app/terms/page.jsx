import MainLayout from "@/components/layout/main";

export default function TermsOfServicePage() {
  return (
    <MainLayout>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">ข้อตกลงและเงื่อนไขการใช้บริการ (Terms of Service)</h1>

      <h2 className="text-xl font-semibold mt-4">1. การใช้บริการ</h2>
      <p>เมื่อคุณเข้าถึงและใช้งานเว็บไซต์นี้ แสดงว่าคุณยอมรับข้อตกลงและเงื่อนไขเหล่านี้โดยสมบูรณ์</p>

      <h2 className="text-xl font-semibold mt-4">2. การสั่งซื้อสินค้า</h2>
      <ul className="list-disc ml-6">
        <li>ผู้ใช้ต้องให้ข้อมูลที่ถูกต้องในการสั่งซื้อ</li>
        <li>เราขอสงวนสิทธิ์ในการยกเลิกคำสั่งซื้อที่ผิดปกติ</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. ความรับผิด</h2>
      <p>เราจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดจากการใช้งานเว็บไซต์หรือล่าช้าในการจัดส่งที่เกิดจากเหตุสุดวิสัย</p>

      <h2 className="text-xl font-semibold mt-4">4. การเปลี่ยนแปลงข้อตกลง</h2>
      <p>เราขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อตกลงนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>
    </div>
    </MainLayout>
  );
}


