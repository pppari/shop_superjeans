// app/shop/page.jsx
import { Suspense } from "react";
import ShopClient from "./shop-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading shop…</div>}>
      <ShopClient />
    </Suspense>
  );
}
