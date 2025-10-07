import { useState, useEffect, useCallback } from 'react';
import axios from "@/lib/axios";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

/**
 * Hook for managing wishlist functionality (toggle add/remove)
 * @returns {Object} Wishlist methods and state
 */
const useWishlistToggle = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  
  // Get user ID from token on mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded?.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch wishlist items on user ID change
  useEffect(() => {
    if (userId) {
      fetchWishlistItems();
    }
  }, [userId]);

  // Fetch all wishlist items for the user
  const fetchWishlistItems = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/user/${userId}`);
      
      if (response.data.success) {
        // Store wishlist items with mapped structure
        const formattedItems = response.data.data.map(item => ({
          id: item._id,
          productId: item.productId._id || item.productId, // Handle both populated and unpopulated
          wishlistItemId: item._id,
          // Include other product details if needed
        }));
        
        setWishlistItems(formattedItems);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Check if a product is in the wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlistItems.some(item => 
      item.productId === productId || 
      (typeof item.productId === 'object' && item.productId?._id === productId)
    );
  }, [wishlistItems]);

  // Get wishlist item ID by product ID
  const getWishlistItemId = useCallback((productId) => {
    const item = wishlistItems.find(item => 
      item.productId === productId || 
      (typeof item.productId === 'object' && item.productId?._id === productId)
    );
    return item?.wishlistItemId || item?.id;
  }, [wishlistItems]);

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    const token = getToken();
    if (!token) {
      toast.error("กรุณาเข้าสู่ระบบก่อน");
      return null;
    }

    if (!userId) {
      toast.error("ไม่พบข้อมูลผู้ใช้");
      return null;
    }

    try {
      const response = await axios.post("/api/wishlist", {
        productId,
        userId,
      });
      
      if (response.data.success) {
        toast.success("เพิ่มรายการโปรดสำเร็จ");
        
        // Update local state
        const newItem = {
          id: response.data.data._id,
          productId: productId,
          wishlistItemId: response.data.data._id
        };
        
        setWishlistItems(prev => [...prev, newItem]);
        return response.data.data;
      }
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      toast.error(err?.response?.data?.message || "ไม่สามารถเพิ่มรายการโปรดได้");
      return null;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    const wishlistItemId = getWishlistItemId(productId);
    
    if (!wishlistItemId) {
      console.error("Wishlist item not found");
      return false;
    }

    try {
      const response = await axios.delete(`/api/wishlist/${wishlistItemId}`);
      
      if (response.data.success) {
        toast.success("ลบออกจากรายการโปรดแล้ว");
        
        // Update local state
        setWishlistItems(prev => prev.filter(item => 
          item.wishlistItemId !== wishlistItemId && item.id !== wishlistItemId
        ));
        
        return true;
      }
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      toast.error(err?.response?.data?.message || "ไม่สามารถลบออกจากรายการโปรดได้");
      return false;
    }
  };

  // Toggle wishlist status (add if not in wishlist, remove if in wishlist)
  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  };

  return {
    wishlistItems,
    loading,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    refreshWishlist: fetchWishlistItems
  };
};

export default useWishlistToggle;