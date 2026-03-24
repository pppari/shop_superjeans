import MainLayout from "@/components/layout/main";

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
      <p>เรามุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) ของประเทศไทย</p>

      <h2 className="text-xl font-semibold mt-4">1. ข้อมูลที่เราเก็บ</h2>
      <ul className="list-disc ml-6">
        <li>ชื่อ, ที่อยู่, เบอร์โทรศัพท์, อีเมล</li>
        <li>ข้อมูลคำสั่งซื้อและการชำระเงิน</li>
        <li>ข้อมูลการใช้งานเว็บไซต์ผ่าน cookies</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2. วัตถุประสงค์ในการเก็บข้อมูล</h2>
      <ul className="list-disc ml-6">
        <li>เพื่อประมวลผลคำสั่งซื้อและการจัดส่งสินค้า</li>
        <li>เพื่อให้บริการลูกค้า</li>
        <li>เพื่อวิเคราะห์และปรับปรุงประสบการณ์ผู้ใช้งาน</li>
        <li>เพื่อการตลาด (โดยได้รับความยินยอมก่อน)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. สิทธิของเจ้าของข้อมูล</h2>
      <ul className="list-disc ml-6">
        <li>สิทธิในการเข้าถึงและขอสำเนาข้อมูล</li>
        <li>สิทธิในการแก้ไขหรือลบข้อมูล</li>
        <li>สิทธิในการถอนความยินยอม</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">4. การติดต่อ</h2>
      <p>หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายนี้ กรุณาติดต่อเราได้ที่ support@example.com</p>
    </div>
    </MainLayout>
  );
}