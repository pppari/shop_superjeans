// app/account/payments/page.jsx
import { Suspense } from "react";
import PaymentsClient from "./payments-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading payments…</div>}>
      <PaymentsClient />
    </Suspense>
  );
}
