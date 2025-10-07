"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import toPrice from "@/lib/toPrice";
import { mainColorImg } from "@/lib/imagePath";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function ProductCard({ product, imageMode }) {
  const [imgError, setImgError] = useState(false);

  const imgPath = useMemo(() => {
    if (!product) return null;
    switch (imageMode) {
      case "main-color":
        return mainColorImg(product._id, product.main_img);
      default:
        return null;
    }
  }, [imageMode, product]);

  return (
    <Card className="w-full max-w-sm overflow-hidden border-gray-200 shadow-none hover:shadow-lg hover:scale-[1.01] transition-all">
      <div className="relative w-full h-60 flex items-center justify-center">
        <Link href={`/product/${product._id}`}>
          {imgPath && !imgError ? (
            <img
              src={imgPath}
              alt={product?.name || "Product Image"}
              className="object-cover w-full h-60"
              onError={() => setImgError(true)}
            />
          ) : (
            <img
              src="/placeholder.webp"
              alt={product?.name || "Product Image"}
              className="object-cover w-full h-full"
            />
          )}
        </Link>
      </div>
      <CardContent className="p-4 flex flex-col gap-2">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold">
            {product?.name || "Unnamed Product"}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs line-clamp-2">
          SKU: {product?.sku}
        </p>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product?.description || "No description available."}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-bold text-base">
            {toPrice(product?.price || 0)}
          </span>
          <div className="flex gap-2">
            <WishlistButton
              productId={product._id}
              variant="outline"
              size="icon"
              showText={false}
              className="flex-shrink-0"
            />
            <Link href={`/product/${product._id}`} className={buttonVariants({variant: "default"})} size="icon" title="Add to Cart" aria-label="Add to Cart">
              <Plus className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
