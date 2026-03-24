"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { colorImages, mainColorImg } from "@/lib/imagePath";
import axios from "@/lib/axios";
import toPrice from "@/lib/toPrice";
import { Loader2, ShoppingCart, Smile, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import addToCart from "@/lib/addToCart";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import dateFormat from "@/lib/dateFormat";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productColors, setProductColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [review, setReview] = useState([]);
  const [average, setAverage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [productRes, colorRes, reviewRes, avgRes] = await Promise.all([
          axios.get(`/api/products/${id}`),
          axios.get(`/api/productColor/byprod/${id}`),
          axios.get(`/api/review/product/${id}`),
          axios.get(`/api/review/product/${id}/average`),
        ]);

        setProduct(productRes.data);
        setProductColors(colorRes.data);
        setReview(reviewRes.data.data);
        setAverage(avgRes.data.data.averageScore);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (productColors.length > 0) {
      setSelectedColor(productColors[0]);
    }
  }, [productColors]);

  useEffect(() => {
    if (!selectedColor) return;

    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `/api/productColorImg/${selectedColor._id}`
        );
        const images = response.data.map((img) => img.fileName);
        setGalleryImages(images);
        setSelectedImage(images[0] || null);
      } catch (e) {
        console.error(e);
      }
    };

    fetchImages();
  }, [selectedColor]);

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <Loader2 className="animate-spin text-gray-500 mx-auto" size={48} />
        <p className="mt-4">กำลังโหลดสินค้า...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* รูปภาพ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col md:flex-row-reverse gap-4">
          {selectedImage ? (
            <div className="bg-gray-100 w-auto md:w-full md:h-[500px] aspect-square overflow-hidden rounded-md">
              <img
                src={colorImages(product._id, selectedColor._id, selectedImage)}
                alt="Selected Product"
                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>
          ) : (
            <Skeleton className="w-full aspect-square rounded-md" />
          )}

          <div className="flex flex-row md:flex-col items-center rounded w-full md:w-26 gap-1 p-2 mr-2">
            {galleryImages.length > 0 ? (
              galleryImages.map((img, idx) => (
                <Card
                  key={idx}
                  onClick={() => handleThumbnailClick(img)}
                  className={`w-20 h-20 flex-shrink-0 bg-white overflow-hidden border-gray-100 rounded cursor-pointer ${
                    selectedImage === img ? "ring-2 ring-black" : ""
                  }`}
                >
                  <img
                    src={colorImages(product._id, selectedColor._id, img)}
                    alt="Thumbnail"
                    className="object-cover w-full h-full"
                  />
                </Card>
              ))
            ) : (
              <Skeleton className="w-20 h-20" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-none">
            <CardHeader className="p-0">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-2xl font-bold">
                  {product.name || <Skeleton className="w-32 h-6" />}
                </p>

                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <p className="font-semibold text-base">{average}</p>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-500 text-sm">
                {product.sku || <Skeleton className="w-12 h-6" />}
                {selectedColor?.color_code || <Skeleton className="w-12 h-6" />}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              <div className="flex space-x-2">
                {product.subCategoryId ? (
                  <Badge variant="secondary">
                    {product.subCategoryId.name}
                  </Badge>
                ) : null}
                <Badge variant="secondary">{product.categoryId.name}</Badge>
                <Badge variant="secondary">{product.roomId.name}</Badge>
              </div>
              <p className="text-muted-foreground">
                {product.description || <Skeleton className="w-full h-4" />}
              </p>

              <p className="text-primary text-2xl font-semibold">
                {product.price ? (
                  toPrice(product.price)
                ) : (
                  <Skeleton className="w-24 h-6" />
                )}
              </p>
              <Accordion type="single" collapsible className="w-full mb-4">
                <AccordionItem value="select-color">
                  <AccordionTrigger className="text-base font-bold border border-gray-300 px-4 items-center">
                    เลือกสี
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex gap-2 mt-4 flex-wrap p-2">
                      {productColors.length > 0 ? (
                        productColors.map((color) => (
                          <img
                            key={color._id}
                            onClick={() => setSelectedColor(color)}
                            src={mainColorImg(product._id, color.main_img)}
                            className={`w-20 h-20 cursor-pointer transform rounded hover:shadow-sm hover:border hover:border-gray-200 ${
                              selectedColor && selectedColor._id === color._id
                                ? "ring-1 ring-black"
                                : ""
                            }`}
                            alt={`Color: ${color.color_code}`}
                          />
                        ))
                      ) : (
                        <Skeleton className="w-32 h-32" />
                      )}
                    </div>

                    {selectedColor && (
                      <div className="text-sm text-gray-500 mt-2">
                        สินค้าคงเหลือ:{" "}
                        {selectedColor.quantity ?? (
                          <Skeleton className="w-16 h-4" />
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {selectedColor && selectedColor.quantity <= 0 ? (
                <>
                  <Button
                    className="w-full rounded-full"
                    size="lg"
                    variant="secondary"
                    disabled
                  >
                    สินค้าหมด
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full rounded-full"
                  size="lg"
                  onClick={async () => {
                    try {
                      await addToCart({
                        productId: product._id,
                        productColorId: selectedColor._id,
                        price: product.price,
                        quantity: 1,
                      });
                      toast.success("เพิ่มสินค้าในตะกร้าสำเร็จ");
                    } catch (err) {
                      console.error(err);
                      router.push("/signin");
                      toast.error("ไม่สามารถเพิ่มสินค้าในตะกร้าได้");
                    }
                  }}
                >
                  <ShoppingCart /> เพิ่มใส่ตะกร้า
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />
      {/* ข้อมูลสินค้า */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">รายละเอียดสินค้า</h3>
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="dimensions">
            <AccordionTrigger>ขนาดสินค้า</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600">{product?.dimensions}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="material">
            <AccordionTrigger>วัสดุที่ใช้</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600">{product?.material}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="weight">
            <AccordionTrigger>น้ำหนัก</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-600">
                {product?.weight} กิโลกรัม
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator />
      {/* รีวิวสินค้า */}
      <div className="mt-8">
        <p className="text-xl font-semibold mb-4">
          รีวิวสินค้า ({review.length || 0})
        </p>

        <div className="flex flex-col space-y-4">
          <Carousel>
            <CarouselContent>
              {review.length > 0 ? (
                review.map((item, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-gray-300 shadow">
                      <CardHeader>
                        <CardTitle>{item.userId.email}</CardTitle>
                        <CardDescription className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={
                                i < item.score
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">
                          {item.message}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-gray-500">
                          {dateFormat(item.created_at)}
                        </p>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))
              ) : (
                <p className="text-center text-gray-400">ยังไม่มีรีวิว</p>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
