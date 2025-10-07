"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import toPrice from "@/lib/toPrice";

const PaymentHistory = () => {
  const token = getToken();
  const userId = jwtDecode(token).id;
  const [orders, setOrders] = useState([]);
  const [activeMethod, setActiveMethod] = useState("promptpay");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?uid=${userId}`);
        const paidOrders = response.data.filter((order) =>
          ["promptpay", "card"].includes(order.payment_method)
        );
        setOrders(paidOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (o) => o.payment_method === activeMethod
  );


  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-lg font-bold">ประวัติการชำระเงิน</h1>

      <Tabs
        defaultValue="promptpay"
        onValueChange={setActiveMethod}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 gap-2">
          <TabsTrigger value="promptpay">PromptPay</TabsTrigger>
          <TabsTrigger value="card">Card</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <>
              <Card
                key={order._id}
                className="p-4 rounded-2xl shadow-sm border border-gray-200"
              >
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {dateFormat(order.order_date)}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                    <span>ช่องทางการชำระ</span>
                    <span>
                      {order.payment_method === "promptpay" ? (
                        <div className="flex items-center gap-2">
                          <img
                            src="/thaiqr.jpg"
                            alt="PromptPay"
                            className="h-4"
                          />
                          <p>PromptPay</p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <img
                            src="/credit-card.png"
                            alt="PromptPay"
                            className="h-4"
                          />
                          <p>Card</p>
                        </div>
                      )}
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                    <span>ราคารวม</span>
                    <span>{toPrice(order.amount - order.payment_fee)}</span>
                  </div>

                  <div className="pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                    <span>ค่าธรรมเนียม</span>
                    <span>{toPrice(order.payment_fee)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                    <span>รวมทั้งหมด</span>
                    <span>{toPrice(order.amount)}</span>
                  </div>

                  <CardFooter>
                  <div className="flex justify-center items-center w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                        >
                          ดูรายละเอียด
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-2xl p-6">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-semibold">
                            รายละเอียดออเดอร์
                          </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 pt-4">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                              Order ID:
                            </span>
                            <span className="text-right break-all">
                              {order._id}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="font-medium text-gray-500">
                              วันที่สั่งซื้อ:
                            </span>
                            <span className="text-right">
                              {dateFormat(order.order_date)}
                            </span>
                          </div>
                          <div className="pt-2 flex justify-between text-sm font-medium">
                            <span className="font-medium text-gray-500">
                              ช่องทางการชำระ
                            </span>
                            <span>
                              {order.payment_method === "promptpay" ? (
                                <div className="flex items-center gap-2">
                                  <img
                                    src="/thaiqr.jpg"
                                    alt="PromptPay"
                                    className="h-4"
                                  />
                                  <p>PromptPay</p>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <img
                                    src="/card.png"
                                    alt="PromptPay"
                                    className="h-4"
                                  />
                                  <p>Card</p>
                                </div>
                              )}
                            </span>
                          </div>

                          <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">
                            สรุปการเงิน
                          </h4>
                          <div className="p-4 border border-gray-500 rounded">
                            <div className="flex justify-between text-sm text-gray-700 font-semibold">
                              <span>ราคารวม</span>
                              <span>
                                {toPrice(order.amount - order.payment_fee)}
                              </span>
                            </div>

                            <div className="pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                              <span>ค่าธรรมเนียม</span>
                              <span>{toPrice(order.payment_fee)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between text-sm text-gray-700 font-semibold">
                              <span>รวมทั้งหมด</span>
                              <span>{toPrice(order.amount)}</span>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">
                            รายการสินค้า
                          </h4>
                          <div className="divide-y text-sm border p-2 rounded shadow-sm">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((item, i) => (
                                <div
                                  key={item._id}
                                  className="flex items-center gap-3 border-gray-200"
                                >
                                  <div className="flex-1">
                                    <Link
                                      href={`/product/${item.productId._id}`}
                                      target="_blank"
                                      className="font-medium text-gray-900"
                                    >
                                      {item.productId?.name ||
                                        "สินค้าถูกลบไปแล้ว"}
                                    </Link>
                                    <p className="text-xs text-gray-500">
                                      สี: {item.productColorId.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      จำนวน: {item.quantity} ชิ้น | ราคา/ชิ้น:{" "}
                                      {item.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="text-sm font-bold text-right whitespace-nowrap">
                                    {toPrice(item.total)}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm">
                                ไม่มีสินค้าในคำสั่งซื้อนี้
                              </p>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            </>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm">
            ไม่พบรายการชำระเงิน
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
