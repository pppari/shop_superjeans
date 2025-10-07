import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mainColorImg } from "@/lib/imagePath";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";
import Fuse from "fuse.js";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import ReviewForm from "../ReviewForm";
import { toast } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

const OrderHistory = () => {
  const token = getToken();
  const userId = jwtDecode(token).id;

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewModal, setReviewModal] = useState(false);
  const [existReview, setExistReview] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const ordersPerPage = 5; // You can increase/decrease as needed

  useEffect(() => {
    fetchOrders();
    fetchReview();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, searchText, statusFilter]);

  const fetchReview = async () => {
    try {
      const response = await axios.get("/api/review/user/" + userId);
      const data = response.data;
      setExistReview(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orders?uid=${userId}`);
      const transformedOrders = response.data.map((order) => ({
        ...order,
        fullname: order.addressId?.fullname || "Unknown",
        email: order.userId?.email || "N/A",
        phone: order.addressId?.phone || "N/A",
        formattedDate: dateFormat(order.order_date),
        full_address: [
          order.addressId?.address,
          order.addressId?.tambon,
          order.addressId?.amphure,
          order.addressId?.province,
          order.addressId?.zip_code,
        ]
          .filter(Boolean)
          .join(" "),
      }));
      setOrders(transformedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = orders;

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    } else {
      // Default: exclude 'ชำระเงินแล้ว'
      filtered = filtered.filter((order) => order.status !== "ชำระเงินสำเร็จ");
    }

    // Apply search
    if (searchText.trim()) {
      const fuse = new Fuse(filtered, {
        keys: ["fullname", "email", "full_address"],
        threshold: 0.3,
      });
      filtered = fuse.search(searchText).map((result) => result.item);
    }

    setFilteredOrders(filtered);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      รอจัดส่ง: "bg-yellow-400",
      อยู่ระหว่างจัดส่ง: "bg-orange-500",
      จัดส่งแล้ว: "bg-green-500",
      ยกเลิก: "bg-gray-400",
    };
    return (
      <Badge className={`${statusColors[status]} text-white`}>{status}</Badge>
    );
  };

  const reviewedKeySet = new Set(
    existReview?.data?.map(
      (review) =>
        `${review.orderId}_${review.productId._id}_${review.productColorId._id}`
    )
  );

  const isItemReviewed = (orderId, productId, colorId) =>
    reviewedKeySet.has(`${orderId}_${productId}_${colorId}`);

  return (
    <div className="p-4 mx-auto space-y-4">
      <h1 className="text-lg font-bold">ประวัติการสั่งซื้อ</h1>
      <Tabs
        defaultValue="ทั้งหมด"
        className="w-full"
        onValueChange={(val) => setStatusFilter(val === "ทั้งหมด" ? null : val)}
      >
        <TabsList className="flex flex-wrap gap-2 overflow-x-auto">
          {[
            "ทั้งหมด",
            "รอจัดส่ง",
            "อยู่ระหว่างจัดส่ง",
            "จัดส่งแล้ว",
            "ยกเลิก",
          ].map((status) => (
            <TabsTrigger key={status} value={status}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredOrders
          .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
          .map((order, idx) => (
            <Card
              key={order._id}
              className="p-4 rounded-2xl shadow-sm border border-gray-200"
            >
              <CardContent>
                {" "}
                <div className="flex flex-col gap-2">
                <div className="text-xs text-gray-500">
                    ID: {order._id}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.formattedDate}
                  </div>
                  <div className="text-sm font-semibold">{order.fullname}</div>
                  <div className="text-sm">{order.phone}</div>
                  <div className="text-xs">{order.full_address}</div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>
                <CardFooter>
                  <div className="flex justify-center items-center w-full">
                    <Dialog open={detailsModal}
                      onOpenChange={setDetailsModal}>
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          size="sm"
                          className="self-center"
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
                        <ScrollArea className="h-96">
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
                                {order.formattedDate}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-500">
                                สถานะ:
                              </span>
                              <span className="text-right">
                                {getStatusBadge(order.status)}
                              </span>
                            </div>

                            <hr />

                            <div className="flex justify-between">
                              <span className="font-medium text-gray-500">
                                ชื่อผู้รับ:
                              </span>
                              <span className="text-right">
                                {order.fullname}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="font-medium text-gray-500">
                                เบอร์โทร:
                              </span>
                              <span className="text-right">{order.phone}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="font-medium text-gray-500">
                                อีเมล:
                              </span>
                              <span className="text-right">{order.email}</span>
                            </div>

                            <div>
                              <span className="block font-medium text-gray-500 mb-1">
                                ที่อยู่จัดส่ง:
                              </span>
                              <p className="text-gray-800 leading-snug whitespace-pre-wrap">
                                {order.full_address || "-"}
                              </p>
                            </div>

                            <div className="divide-y text-sm border p-2 rounded shadow-sm">
                              {order.items && order.items.length > 0 ? (
                                order.items.map((item, i) => (
                                  <div
                                    key={item._id}
                                    className="flex items-start gap-3 py-3"
                                  >
                                    <img
                                      src={mainColorImg(
                                        item.productId._id,
                                        item.productColorId.main_img
                                      )}
                                      alt="Product"
                                      className="w-20 h-20 object-cover rounded"
                                    />
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
                                        จำนวน: {item.quantity} ชิ้น |
                                        ราคา/ชิ้น:{" "}
                                        {item.price.toLocaleString()} ฿
                                      </p>
                                    </div>

                                    <div className="flex flex-col items-end">
                                      <div className="text-sm font-bold text-right whitespace-nowrap">
                                        {item.total.toLocaleString()} ฿
                                      </div>
                                      {/* รีวิวสินค้า */}
                                      {order.status === "จัดส่งแล้ว" && (
                                        <Dialog
                                          open={reviewModal}
                                          onOpenChange={setReviewModal}
                                        >
                                          <DialogTrigger asChild>
                                            <Button
                                              variant="default"
                                              size="sm"
                                              className="mt-2"
                                              disabled={isItemReviewed(
                                                order._id,
                                                item.productId._id,
                                                item.productColorId._id
                                              )}
                                            >
                                              {isItemReviewed(
                                                order._id,
                                                item.productId._id,
                                                item.productColorId._id
                                              )
                                                ? "รีวิวแล้ว"
                                                : "รีวิว"}
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent className="max-w-md rounded-2xl p-6">
                                            <DialogHeader>
                                              <DialogTitle className="text-base">
                                                รีวิว {item.productId.name}
                                              </DialogTitle>
                                            </DialogHeader>
                                            <ReviewForm
                                              productId={item.productId._id}
                                              productColorId={
                                                item.productColorId._id
                                              }
                                              orderId={order._id}
                                              userId={userId}
                                              onSuccess={() => {
                                                toast.success(
                                                  "ส่งรีวิวเรียบร้อย"
                                                );
                                                setReviewModal(false); // ✅ ปิด dialog
                                                setDetailsModal(false);
                                              }}
                                            />
                                          </DialogContent>
                                        </Dialog>
                                      )}
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
                        </ScrollArea>
                        <DialogFooter>
                          <DialogClose>
                            <Button variant="secondary">ปิด</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        {filteredOrders.length === 0 && !loading && (
          <p className="text-center text-gray-500">ไม่พบออเดอร์</p>
        )}
      </div>

      {filteredOrders.length > ordersPerPage && (
        <div className="flex justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </Button>
          {Array.from({
            length: Math.ceil(filteredOrders.length / ordersPerPage),
          }).map((_, idx) => (
            <Button
              key={idx}
              variant={currentPage === idx + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={
              currentPage === Math.ceil(filteredOrders.length / ordersPerPage)
            }
          >
            ถัดไป
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
