import MainLayout from "@/components/layout/main";

// app/cookies/page.jsx
export default function CookiesPolicyPage() {
  return (
    <MainLayout>
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">นโยบายคุกกี้ (Cookies Policy)</h1>

      <p>เว็บไซต์ของเราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ หากคุณใช้เว็บไซต์นี้ต่อ แสดงว่าคุณยินยอมต่อการใช้คุกกี้</p>

      <h2 className="text-xl font-semibold mt-4">1. คุกกี้คืออะไร</h2>
      <p>คุกกี้คือไฟล์ข้อความขนาดเล็กที่จัดเก็บไว้ในอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์</p>

      <h2 className="text-xl font-semibold mt-4">2. คุกกี้ที่เราใช้</h2>
      <ul className="list-disc ml-6">
        <li>คุกกี้เพื่อการทำงานของระบบ</li>
        <li>คุกกี้เพื่อการวิเคราะห์การใช้งาน</li>
        <li>คุกกี้เพื่อการตลาด (จำเป็นต้องได้รับความยินยอม)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. การจัดการคุกกี้</h2>
      <p>คุณสามารถตั้งค่าเบราว์เซอร์ของคุณให้ปฏิเสธคุกกี้ทั้งหมดหรือบางส่วนได้ แต่ฟีเจอร์บางอย่างอาจใช้งานไม่ได้</p>
    </div>
    </MainLayout>
  );
}
