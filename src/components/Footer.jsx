"use client";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FAQDialog from "./FaqDialog";

export default function Footer() {
  return (
    <footer className="bg-white text-black px-6 py-8 mt-20 border-t border-orange-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={150} height={40} />
          </Link>
          <p className="text-sm mt-4">
            88/7 Sukhumvit Soi 55 (Thonglor)
          </p>
          <p className="text-sm">
Khlong Tan Nuea, Watthana Bangkok
          </p>
          <p className="text-sm mb-2">
            10110, Thailand
          </p>
          <Link href="tel:+6621234567" className="text-sm">
          +66 2 123 4567
          </Link>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-black mb-4">เมนูลัด</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:underline">
                ร้านค้า
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                ติดต่อเรา
              </Link>
            </li>
            <li>
              <FAQDialog />
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-black mb-4">ช่องทางติดตาม</h4>
          <div className="flex space-x-4">
            <Link href="#" className={buttonVariants({variant: "outline", size: "icon"})}>
              <Facebook size={24} className="hover:text-black" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between text-sm border-t border-gray-800 pt-6">
        <p>&copy; {new Date().getFullYear()} Super Jeans Furniture. All rights reserved.</p>
        <div className="flex space-x-1">
        <Link href="/privacy">Privacy Policy</Link> 
        <p>|</p>
        <Link href="/terms">Terms Of Services</Link>
        <p>|</p>
        <Link href="/cookie">Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
}
