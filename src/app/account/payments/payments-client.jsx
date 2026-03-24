// app/account/payments/payments-client.jsx
"use client";

import React from "react";
import UserLayout from "@/components/layout/UserLayout";
import PaymentHistory from "@/components/user/PaymentHistory";
import useRouteGuard from "@/hooks/routeGuard";

export default function PaymentsClient() {
  useRouteGuard();
  return (
    <UserLayout>
      <PaymentHistory />
    </UserLayout>
  );
}
