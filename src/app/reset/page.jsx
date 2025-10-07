// app/reset/page.jsx
import { Suspense } from "react";
import ResetPageClient from "./reset-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Loading…</div>}>
      <ResetPageClient />
    </Suspense>
  );
}
