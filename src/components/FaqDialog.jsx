"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link href="#" className="p-0 h-auto text-sm text-black font-light hover:underline">
          คำถามที่พบบ่อย
        </Link>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">คำถามที่พบบ่อย</DialogTitle>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full mt-4 space-y-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>นโยบายการคืนสินค้าเป็นอย่างไร?</AccordionTrigger>
            <AccordionContent>
              เรารับคืนสินค้าภายใน 30 วันหลังจากได้รับสินค้า โดยสินค้าต้องอยู่ในสภาพใหม่ และอยู่ในบรรจุภัณฑ์เดิม
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>สามารถจัดส่งสินค้าต่างประเทศได้หรือไม่?</AccordionTrigger>
            <AccordionContent>
              ได้ เรามีบริการจัดส่งสินค้าระหว่างประเทศ ค่าจัดส่งและระยะเวลาอาจแตกต่างกันตามประเทศปลายทาง
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>จะสามารถติดตามสถานะคำสั่งซื้อได้อย่างไร?</AccordionTrigger>
            <AccordionContent>
              หลังจากที่จัดส่งสินค้าเรียบร้อยแล้ว คุณจะได้รับหมายเลขติดตามพัสดุทางอีเมล
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>ใช้เวลาจัดส่งนานแค่ไหน?</AccordionTrigger>
            <AccordionContent>
              ระยะเวลาจัดส่งภายในประเทศไทยอยู่ที่ประมาณ 3–7 วันทำการ สำหรับต่างประเทศอาจใช้เวลานานกว่านั้นขึ้นอยู่กับปลายทาง
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>สามารถสั่งทำเฟอร์นิเจอร์ตามแบบได้หรือไม่?</AccordionTrigger>
            <AccordionContent>
              ได้ เรามีบริการสั่งทำเฟอร์นิเจอร์ตามความต้องการของลูกค้า กรุณาติดต่อทีมงานเพื่อขอใบเสนอราคา
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
