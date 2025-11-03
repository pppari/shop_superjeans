'use client'

import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const token = getToken();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  
  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode.id);
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      getWishlist();
    }
  }, [userId]);

  const getWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/user/${userId}`);
      
      // The API returns data in the format { success: true, data: [...] }
      if (response.data.success) {
        // Map the wishlist items to match the expected structure in the UI
        const formattedWishlist = response.data.data.map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          description: item.productId.description,
          price: item.productId.price,
          main_img: item.main_img || '/placeholder-product.png' // Fallback image
        }));
        // console.log("Formatted Wishlist:", formattedWishlist);
        setWishlist(formattedWishlist);
      } else {
        toast.error("Failed to fetch wishlist");
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Error loading wishlist");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = wishlist.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(wishlist.length / productsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Card className="border-none my-12 bg-white">
      <CardHeader>
        <CardTitle>รายการถูกใจ</CardTitle>
        <CardDescription>
          <div className="bg-orange-300 h-1 w-12"></div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">ไม่มีสินค้าในรายการโปรด</p>
            <Button className="mt-4 bg-orange-500 hover:bg-orange-600" onClick={() => window.location.href = '/shop'}>
              ไปหน้าสินค้า
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentProducts.map((product, index) => (
                <ProductCard key={`${product._id}-${index}`} product={product} imageMode="main-color" />
              ))}
            </div>

            {/* Pagination Controls */}
            {wishlist.length > productsPerPage && (
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
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WishlistPage;