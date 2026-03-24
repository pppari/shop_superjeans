"use client";

import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { Badge } from "@/components/ui/badge";
import { mainColorImg } from "@/lib/imagePath";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { CloudDownload } from "lucide-react";


const SingleOrder = ({ id }) => {
  const [order, setOrder] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`/api/orders/${id}`);
      const o = res.data;

      setOrder({
        ...o,
        fullname: o.addressId?.fullname || "Unknown",
        email: o.userId?.email || "N/A",
        phone: o.addressId?.phone || "N/A",
        formattedDate: dateFormat(o.order_date),
        full_address: [
          o.addressId?.address,
          o.addressId?.tambon,
          o.addressId?.amphure,
          o.addressId?.province,
          o.addressId?.zip_code,
        ]
          .filter(Boolean)
          .join(" "),
      });
    } catch (err) {
      console.error("Error fetching order", err);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      รอจัดส่ง: "bg-yellow-400",
      อยู่ระหว่างจัดส่ง: "bg-orange-500",
      จัดส่งแล้ว: "bg-green-500",
      ยกเลิก: "bg-gray-400",
    };
    return <Badge className={`${statusColors[status]} text-white`}>{status}</Badge>;
  };

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `ใบเสร็จรับเงิน-${order?._id}`,
  });

  if (!order) return <p className="text-center mt-10 text-gray-500">กำลังโหลด...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">รายละเอียดออเดอร์</h1>
        <Button onClick={handlePrint}><CloudDownload /> ดาวน์โหลด</Button>
      </div>

      <div ref={contentRef} className="bg-white p-6 rounded-xl">
        {/* Logo + Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">ใบเสร็จรับเงิน</h2>
            <p className="text-sm text-gray-500">{order.formattedDate}</p>
          </div>
          <div className="w-24 flex items-center justify-center text-xs text-gray-500">
            <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
          <div>
            <p className="font-medium">Order ID</p>
            <p>{order._id}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">สถานะ</p>
            {getStatusBadge(order.status)}
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">ข้อมูลลูกค้า</h3>
          <p><span className="font-medium">ชื่อผู้รับ:</span> {order.fullname}</p>
          <p><span className="font-medium">เบอร์โทร:</span> {order.phone}</p>
          <p><span className="font-medium">อีเมล:</span> {order.email}</p>
        </div>

        {/* Shipping Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">ที่อยู่จัดส่ง</h3>
          <p className="whitespace-pre-wrap">{order.full_address}</p>
        </div>

        {/* Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">รายการสินค้า</h3>
          <div className="divide-y border rounded">
            {order.items?.length > 0 ? order.items.map((item) => (
              <div key={item._id} className="flex gap-4 p-3">
                <img
                  src={mainColorImg(item.productId._id, item.productColorId.main_img)}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.productId?.name}</p>
                  <p className="text-sm text-gray-500">สี: {item.productColorId.name}</p>
                  <p className="text-sm text-gray-500">
                    จำนวน: {item.quantity} | ราคา/ชิ้น: {item.price.toLocaleString()} ฿
                  </p>
                </div>
                <div className="text-sm font-bold text-right whitespace-nowrap">
                  {item.total.toLocaleString()} ฿
                </div>
              </div>
            )) : (
              <p className="text-gray-500 text-sm p-3">ไม่มีสินค้าในคำสั่งซื้อนี้</p>
            )}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="text-sm text-gray-700 border-t pt-4">
          <div className="flex justify-between">
            <span>ยอดรวมสินค้า</span>
            <span>{(order.amount + order.discount_amount - order.payment_fee).toLocaleString()} ฿</span>
          </div>
          <div className="flex justify-between">
            <span>ส่วนลด</span>
            <span className="text-green-600">- {order.discount_amount.toLocaleString()} ฿</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าธรรมเนียม ({order.payment_method === "card" ? "บัตรเครดิต" : "พร้อมเพย์"})</span>
            <span>{order.payment_fee.toLocaleString()} ฿</span>
          </div>
          <div className="flex justify-between font-bold text-base mt-2 border-t pt-2">
            <span>ยอดสุทธิ</span>
            <span>{order.amount.toLocaleString()} ฿</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
