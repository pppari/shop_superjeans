// app/account/orders/page.jsx   ← เช็คสะกดโฟลเดอร์ให้ถูก "account" ไม่ใช่ "acoount"
import { Suspense } from "react";
import OrdersClient from "./orders-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading orders…</div>}>
      <OrdersClient />
    </Suspense>
  );
}
