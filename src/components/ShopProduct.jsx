"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button"; // import Button if not imported yet
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Info } from "lucide-react";

function ShopProduct({ products, shopTitle }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // You can change how many products per page

  // Calculate current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Card className="border-none flex-1 my-0 lg:my-12 bg-white">
      <CardHeader>
        <CardTitle>{shopTitle}</CardTitle>
        <CardDescription>
          <div className="bg-orange-300 h-1 w-12"></div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                imageMode="main-color"
              />
            ))}
          </div>
        ) : (
          <Alert className="w-full">
            <Info className="h-4 w-4" />
            <AlertTitle>ไม่พบสินค้าตามคำขอ</AlertTitle>
            <AlertDescription>
              ขออภัย, สินค้าที่ท่านค้นหาไม่มีในคลังสินค้าหรือหมดสต็อก
            </AlertDescription>
          </Alert>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShopProduct;
