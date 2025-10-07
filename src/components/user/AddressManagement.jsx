"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import axios from "@/lib/axios";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";

export default function AddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    province: "",
    amphure: "",
    tambon: "",
    zip_code: "",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = getToken(); // If async, use: const token = await getToken();
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  const fetchAddresses = async (uid) => {
    if (!uid) return;
    try {
      const res = await axios.get("/api/address", { params: { userId: uid } });
        setAddresses(res.data); // Ensure correct key
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  useEffect(() => {
    fetchAddresses(userId);
  }, [userId]);

  const openAddModal = () => {
    setEditingAddress(null);
    setFormData({
      fullname: "",
      phone: "",
      address: "",
      province: "",
      amphure: "",
      tambon: "",
      zip_code: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setFormData({ ...address });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?")) return;
    try {
      await axios.patch(`/api/address/${id}`); // Consider DELETE instead
      fetchAddresses(userId);
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await axios.put(`/api/address/${editingAddress._id}`, formData);
      } else {
        await axios.post("/api/address/create", { ...formData, userId });
      }
      setModalOpen(false);
      fetchAddresses(userId);
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  return (
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">จัดการที่อยู่</h1>
          <Button onClick={openAddModal}>เพิ่มที่อยู่ใหม่</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((addr) => (
              <Card key={addr._id} className="border-gray-200">
                <CardContent className="p-4 space-y-1 relative">
                  <div className="font-semibold">{addr.fullname}</div>
                  <div>{addr.phone}</div>
                  <div>
                    {addr.address}, ต.{addr.tambon}, อ.{addr.amphure}, จ.
                    {addr.province} {addr.zip_code}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4 m-0">
                  <Button variant="secondary" onClick={() => openEditModal(addr)}>
                    <Pencil className="w-4 h-4 mr-1" /> แก้ไข
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(addr._id)}>
                    <Trash2 className="w-4 h-4 text-red-500 mr-1" /> ลบ
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                ["fullname", "ชื่อ-นามสกุล"],
                ["phone", "เบอร์โทร"],
                ["address", "ที่อยู่"],
              ].map(([name, label]) => (
                  <div key={name} className="grid gap-2">
                    <Label htmlFor={name}>{label}</Label>
                    <Input
                        name={name}
                        id={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                    />
                  </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["tambon", "ตำบล"],
                  ["amphure", "อำเภอ"],
                  ["province", "จังหวัด"],
                  ["zip_code", "รหัสไปรษณีย์"],
                ].map(([name, label]) => (
                    <div key={name} className="grid gap-2">
                      <Label htmlFor={name}>{label}</Label>
                      <Input
                          name={name}
                          id={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                      />
                    </div>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit">บันทึก</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
  );
}
