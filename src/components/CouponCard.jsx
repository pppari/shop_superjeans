import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";
import toPrice from "@/lib/toPrice";

export function CouponCard({ coupon = [], selectedCoupon, setSelectedCoupon }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (c) => {
    setSelectedCoupon(c);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`flex gap-4 items-center p-2 border rounded cursor-pointer hover:bg-gray-50 ${
            coupon.length > 0 ? "border-gray-200" : "border-gray-100"
          }`}
        >
          <Percent className={coupon.length > 0 ? "text-black" : "text-gray-400"} />
          {selectedCoupon && coupon.length > 0 ? (
            <div>
              <p className="font-bold">{selectedCoupon.code}</p>
              <p className="text-xs">ขั้นต่ำ {toPrice(selectedCoupon.minimum_price)}</p>
              <p className="text-xs text-gray-500">
                ลดราคา {selectedCoupon.discount_amount}{" "}
                {selectedCoupon.discount_type === "fixed" ? "฿" : "%"}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-gray-400">ไม่มีส่วนลด</p>
              <p className="text-xs text-gray-400">ยอดรวมของคุณอาจยังไม่เพียงพอ</p>
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เลือกส่วนลด</DialogTitle>
          <DialogDescription>เลือกใช้ส่วนลดที่คุณต้องการ</DialogDescription>
        </DialogHeader>

        {coupon.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-auto">
            {coupon.map((c) => (
              <div
                key={c._id}
                className={`flex gap-4 items-center p-3 border rounded cursor-pointer hover:border-black ${
                  selectedCoupon?._id === c._id ? "border-black bg-gray-50" : "border-gray-200"
                }`}
                onClick={() => handleSelect(c)}
              >
                <Percent className="text-primary" />
                <div>
                  <p className="font-bold">{c.code}</p>
                  <p className="text-xs">ขั้นต่ำ {toPrice(c.minimum_price)}</p>
                  <p className="text-xs text-gray-500">
                    ลดราคา {c.discount_amount}
                    {c.discount_type === "fixed" ? " ฿" : "%"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">ไม่มีส่วนลดที่ใช้ได้</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
