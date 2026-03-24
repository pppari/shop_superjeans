'use client'

import React, { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import axios from '@/lib/axios'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Percent } from 'lucide-react'
import { promoImg } from '@/lib/imagePath'
import { Skeleton } from "@/components/ui/skeleton"


function PromotionCard() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/promotion-images');
      setPromotions(res.data?.data || []); // Handle potential undefined response data
    } catch (err) {
      console.error('Failed to fetch promotion images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Card className="border-none mx-6 my-12">
      <CardHeader>
        <CardTitle>
          <div className="flex space-x-1 items-end">
            <Percent size={18} className="text-orange-500 fill-orange-500" />
            <p>โปรโมชัน</p>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="bg-orange-300 h-1 w-12"></div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="w-full">
            <Skeleton className="w-full h-[300px] rounded-2xl" />
          </div>
        ) : (
          <Carousel
            className="w-full"
            plugins={[plugin.current]}
          >
            <CarouselContent>
              {promotions.length > 0 ? (
                promotions.map((promo, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <img
                      src={promo.filename ? promoImg(promo.filename) : "/placeholder.webp"}
                      alt={promo.alt}
                      className="rounded-2xl h-auto w-full object-cover aspect-16/9"
                    />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="basis-full">
                  <img
                    src="/placeholder.webp"
                    alt="No promotions available"
                    className="rounded-2xl h-auto w-full object-cover aspect-16/9"
                  />
                </CarouselItem>
              )}
            </CarouselContent>
          </Carousel>
        )}
      </CardContent>
    </Card>
  )
}

export default PromotionCard
