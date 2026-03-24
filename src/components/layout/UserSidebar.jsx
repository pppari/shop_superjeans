import React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { DollarSign, House, LogOut, ShoppingCart } from "lucide-react";

const menuItems = [
  {
    label: "ประวัติการสั่งซื้อ",
    href: "/account/orders",
    icon: <ShoppingCart />
  },
  {
    label: "ประวัติการชำระเงิน",
    href: "/account/payments",
    icon: <DollarSign />
  },
  {
    label: "จัดการที่อยู่จัดส่ง",
    href: "/account/addresses",
    icon: <House />
  },
  {
    label: "ออกจากระบบ",
    href: "/signout",
    icon: <LogOut />
  },
];

const UserSidebar = () => {

  return (
    <ScrollArea className="w-full hidden lg:w-64 border-r border-gray-200 bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl mb-4 font-semibold">เมนู</h2>
        <Separator />
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex gap-4 items-center px-4 py-3 rounded-lg text-sm font-medium transition hover:bg-gray-200"
            )}
          >
            {item.icon}
            {" "}
            {item.label}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UserSidebar;
