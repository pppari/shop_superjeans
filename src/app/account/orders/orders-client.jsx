// app/account/orders/orders-client.jsx
"use client";

import React from "react";
import UserLayout from "@/components/layout/UserLayout";
import OrderHistory from "@/components/user/OrderHistory";
import useRouteGuard from "@/hooks/routeGuard";

export default function OrdersClient() {
  useRouteGuard();
  return (
    <UserLayout>
      <OrderHistory />
    </UserLayout>
  );
}
