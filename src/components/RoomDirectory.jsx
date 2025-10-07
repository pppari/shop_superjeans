'use client'

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { roomImg } from '@/lib/imagePath'
import RoomItem from './RoomItem'
import { Skeleton } from '@/components/ui/skeleton'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'

function RoomDirectory() {
  const [roomItems, setRoomItems] = useState([])
  const [loading, setLoading] = useState(true)

  const getRoom = async () => {
    try {
      const res = await axios.get('/api/rooms')
      setRoomItems(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRoom()
  }, [])

  return (
    <Carousel className="pt-8 px-6">
      <CarouselContent className="-ml-4">
        {(loading ? Array.from({ length: 8 }) : roomItems).map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-4 lg:basis-1/4 sm:basis-1/2" // 4 items per view
          >
                {loading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : (
                  <RoomItem
                    id={item._id}
                    title={item.name}
                    url={roomImg(item.fileName)}
                  />
                )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default RoomDirectory
