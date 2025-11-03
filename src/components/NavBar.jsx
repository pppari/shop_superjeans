"use client";

import * as React from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function NavBar() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getCategory = async () => {
    try {
      const res = await axios.get("/api/categories");
      console.log(res);
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  const renderSkeleton = (cols = 5, rows = 1) => (
    <div className={`grid grid-cols-${cols} gap-6 p-6 w-[${cols * 150}px]`}>
      {Array.from({ length: cols * rows }).map((_, idx) => (
        <Skeleton key={idx} className="h-6 w-24" />
      ))}
    </div>
  );

  const renderMegaMenuContent = (items) => (
    <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {items.map((item) => (
        <NavigationMenuLink key={item._id} asChild>
          <a
            href={`/shop?${
              item.subCategories ? `c=${item._id}` : `sc=${item._id}`
            }`}
            className="hover:bg-amber-100"
          >
            <div className="text-sm leading-none font-medium">{item.name}</div>
            <p className="text-gray-500 line-clamp-2 text-xs leading-snug">
              {item.description}
            </p>
          </a>
        </NavigationMenuLink>
      ))}
    </ul>
  );

  return (
    <div className="hidden lg:flex justify-center py-4 bg-orange-300 text-sm">
        <NavigationMenu>
          <NavigationMenuList>
            {/* All Products */}
            <NavigationMenuItem className={'relative'}>
              <NavigationMenuLink asChild>
                <a href="/shop" className="px-3 py-2">
                  สินค้าทั้งหมด
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* All Categories Mega Menu */}
            <NavigationMenuItem className={'relative'}>
              <NavigationMenuTrigger>ประเภททั้งหมด</NavigationMenuTrigger>
              <NavigationMenuContent>
                {loading
                  ? renderSkeleton(3, 2)
                  : renderMegaMenuContent(categories)}
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Top-level categories */}
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <NavigationMenuItem key={idx}>
                    <Skeleton className="h-6 w-24 px-3 py-2" />
                  </NavigationMenuItem>
                ))
              : categories.map((cat) => {
                  if (cat.subCategories?.length > 0) {
                    return (
                      <NavigationMenuItem key={cat._id}>
                        <NavigationMenuTrigger>
                          {cat.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {renderMegaMenuContent(cat.subCategories)}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }
                  return (
                    <NavigationMenuItem key={cat._id}>
                      <NavigationMenuLink asChild>
                        <Link href={`/shop?c=${cat._id}`} className="px-3 py-2">
                          {cat.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="px-3 py-2">
                  ติดต่อเรา
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </NavigationMenu>
    </div>
  );
}
