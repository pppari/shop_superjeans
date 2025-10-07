import React from 'react'
import Link from "next/link";

function RoomItem({ id, title, url }) {
  return (
    <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto overflow-hidden rounded shadow-md cursor-pointer">
      {/* Background Image */}
      <Link href={`/shop?r=${id}`}>
        <img
        src={url}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        className="absolute inset-0 z-10"
      />

      {/* Text Content */}
      <div className="absolute z-20 inset-0 flex flex-col justify-end p-4 text-white">
        <h2 className="text-xl">{title}</h2>
      </div>

      </Link>
    </div>
  );
}

export default RoomItem;
