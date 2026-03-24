'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import useWishlistToggle from "@/hooks/useWishlistToggle";

/**
 * Wishlist toggle button component
 * @param {Object} props Component props
 * @param {string} props.productId The product ID
 * @param {string} [props.variant="outline"] Button variant
 * @param {string} [props.size="default"] Button size
 * @param {boolean} [props.showText=true] Whether to show text or icon only
 * @param {string} [props.className] Additional CSS classes
 */
const WishlistButton = ({ 
  productId,
  variant = "outline",
  size = "default",
  showText = true,
  className = ""
}) => {
  const { isInWishlist, toggleWishlist } = useWishlistToggle();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const inWishlist = isInWishlist(productId);
  
  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      await toggleWishlist(productId);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant={inWishlist ? "secondary" : variant}
      size={size}
      className={`${className} ${isProcessing ? 'opacity-70' : ''}`}
      onClick={handleToggleWishlist}
      disabled={isProcessing}
    >
      <Heart 
        className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''} ${showText ? 'mr-2' : ''} ${inWishlist ? 'text-red-500' : ''}`} 
      />
      {showText && (inWishlist ? 'ลบออกจากรายการโปรด' : 'เพิ่มในรายการโปรด')}
    </Button>
  );
};

export default WishlistButton;