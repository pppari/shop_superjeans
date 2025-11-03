// app/shop/shop-client.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/lib/axios";
import ShopProduct from "@/components/ShopProduct";
import { Filter, Loader } from "lucide-react";
import MainLayout from "@/components/layout/main";
import ProductSidebar from "@/components/ProductSideBar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const r = searchParams.get("r");
  const c = searchParams.get("c");
  const sc = searchParams.get("sc");

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomFilter, setRoomFilter] = useState([]);
  const [category, setCategory] = useState(null);
  const [catFilter, setCatFilter] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("ทั้งหมด");

  // filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "/api/products";

      if (r) url += `?r=${r}`;
      else if (c) url += `?c=${c}`;
      else if (sc) url += `?sc=${sc}`;

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (e) {
      console.error(e);
      setError("โหลดสินค้าล้มเหลว");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoom = async () => {
    if (!r) return;
    try {
      const response = await axios.get(`/api/rooms/${r}`);
      setRoom(response.data);
      setTitle(response.data.name);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCategory = async () => {
    if (!c) return;
    try {
      const response = await axios.get(`/api/categories/${c}`);
      setCategory(response.data);
      setTitle(response.data.name);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSubCategory = async () => {
    if (!sc) return;
    try {
      const response = await axios.get(`/api/sub-categories/${sc}`);
      const subCategory = response.data;
      setTitle(`${subCategory.categoryId.name} > ${subCategory.name}`);
      const roomResponse = await axios.get(`/api/rooms`);
      setRoomFilter(roomResponse.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRoomFilter = async () => {
    try {
      const response = await axios.get(`/api/rooms`);
      setRoomFilter(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCatFilter = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      setCatFilter(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProducts = useMemo(() => {
    const noFilters =
      !r &&
      !c &&
      !sc &&
      selectedCategories.length === 0 &&
      selectedSubCategories.length === 0 &&
      selectedRooms.length === 0 &&
      priceRange[0] === 1000 &&
      priceRange[1] === 100000; // ตรวจว่าเป็น default range ของคุณ

    if (noFilters) return products;

    return products.filter((product) => {
      const inCategory = c
        ? product.categoryId?._id === c
        : selectedCategories.length === 0 ||
          selectedCategories.includes(product.categoryId?._id);

      const inSubCategory =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(product.subCategoryId?._id);

      const inRoom =
        selectedRooms.length === 0 ||
        selectedRooms.includes(product.roomId?._id);

      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return inCategory && inSubCategory && inRoom && inPriceRange;
    });
  }, [
    products,
    r,
    c,
    sc,
    selectedCategories,
    selectedSubCategories,
    selectedRooms,
    priceRange,
  ]);

  // ถ้า query string เปลี่ยน ให้ refetch
  useEffect(() => {
    fetchProducts();
    fetchCategory();
    fetchRoom();
    fetchSubCategory();

    if (c) fetchRoomFilter();
    if (r) fetchCatFilter();
    if (!r && !c && !sc) {
      fetchRoomFilter();
      fetchCatFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r, c, sc]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader className="animate-spin w-12 h-12 text-orange-500" />
      </div>
    );
  }

  if (error) {
    return <div>เกิดข้อผิดพลาด: {error}</div>;
  }

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-4 bg-slate-100 px-4">
        <div className="grid lg:hidden">
          <Drawer direction="left">
            <DrawerTrigger>
              <Button className="mt-4 w-full">
                <Filter />
                ตัวกรองสินค้า
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-0">
              <ScrollArea className="h-screen">
                <ProductSidebar
                  r={r}
                  c={c}
                  sc={sc}
                  categories={catFilter}
                  rooms={roomFilter}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedSubCategories={selectedSubCategories}
                  setSelectedSubCategories={setSelectedSubCategories}
                  selectedRooms={selectedRooms}
                  setSelectedRooms={setSelectedRooms}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="default" className="w-full">
                      ตกลง
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>

        <ShopProduct products={filteredProducts} shopTitle={title} />

        <div className="hidden lg:block">
          <ProductSidebar
            r={r}
            c={c}
            sc={sc}
            categories={catFilter}
            rooms={roomFilter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedSubCategories={selectedSubCategories}
            setSelectedSubCategories={setSelectedSubCategories}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
      </div>
    </MainLayout>
  );
}
