// components/CookieConsent.jsx
"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto bg-white border shadow-lg rounded-xl p-4 z-50">
        <div className="flex justify-between items-center">
 <p className="text-sm mb-2">
        เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ
      </p>
      <button
        onClick={handleAccept}
        className="bg-black text-white px-4 py-2 text-sm rounded"
      >
        ยอมรับ
      </button>
        </div>
     
    </div>
  );
}
