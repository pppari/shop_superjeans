// app/account/review/review-client.jsx
"use client";

import React from "react";
import MainLayout from "@/components/layout/main";
import UserReviewManager from "@/components/user/ReviewManager";
// ถ้าต้องกัน route เฉพาะผู้ใช้ที่ล็อกอิน ให้ใช้ hook เดิมได้
// import useRouteGuard from "@/hooks/routeGuard";

export default function ReviewClient() {
  // useRouteGuard();
  return (
    <MainLayout>
      <UserReviewManager />
    </MainLayout>
  );
}
