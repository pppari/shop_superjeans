"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import toPrice from "@/lib/toPrice";

export default function ProductSidebar({
  r,
  c,
  sc,
  categories,
  rooms,
  selectedCategories,
  setSelectedCategories,
  selectedSubCategories,
  setSelectedSubCategories,
  selectedRooms,
  setSelectedRooms,
  priceRange,
  setPriceRange,
}) {
  const [mode, setMode] = useState("all");
  const [subCat, setSubCat] = useState([]);

  useEffect(() => {
    if (r) setMode("room");
    else if (c) {
      setMode("category");
      getSubCategory();
    } else if (sc) setMode("subcategory");
    else setMode("all");
  }, [r, c, sc]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubCategoryChange = (subId) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subId) ? prev.filter((s) => s !== subId) : [...prev, subId]
    );
  };

  const handleRoomChange = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((r) => r !== roomId)
        : [...prev, roomId]
    );
  };

  const getSubCategory = async () => {
    try {
      const res = await axios.get("/api/sub-categories/category/" + c);
      setSubCat(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch sub-categories:", error);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="w-full my-0 lg:my-12 bg-white rounded-xl backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-amber-200/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2a2 2 0 002-2V5a1 1 0 100-2H3zm11.5 4.5a.5.5 0 00-1 0V8a.5.5 0 001 0V7.5zm-1 2.5a.5.5 0 001 0v.5a.5.5 0 00-1 0V10zm1 2.5a.5.5 0 00-1 0v.5a.5.5 0 001 0V12.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            ตัวกรอง
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {mode === "room" && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
              <h2 className="text-lg font-bold text-amber-900">ประเภท</h2>
            </div>

            <div className="space-y-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-amber-100/30"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Checkbox
                      id={cat.name}
                      checked={selectedCategories.includes(cat._id)}
                      onCheckedChange={() => {
                        handleCategoryChange(cat._id);
                        if (selectedCategories.includes(cat._id)) {
                          setSelectedSubCategories((prev) =>
                            prev.filter(
                              (s) =>
                                !cat.subCategories
                                  .map((sc) => sc._id)
                                  .includes(s)
                            )
                          );
                        }
                      }}
                      className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                    />
                    <Label
                      htmlFor={cat.name}
                      className="font-semibold text-amber-900 capitalize cursor-pointer"
                    >
                      {cat.name}
                    </Label>
                  </div>

                  {selectedCategories.includes(cat._id) &&
                    cat.subCategories.length > 0 && (
                      <div className="space-y-2 pl-6 border-l-2 border-amber-300/50 ml-2 animate-in slide-in-from-left-2 duration-300">
                        {cat.subCategories.map((sub) => (
                          <div
                            key={sub._id}
                            className="flex items-center space-x-3 py-1 group"
                          >
                            <Checkbox
                              id={`subcat-${sub.name}`}
                              checked={selectedSubCategories.includes(sub._id)}
                              onCheckedChange={() =>
                                handleSubCategoryChange(sub._id)
                              }
                              className="data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 border-amber-300 scale-90"
                            />
                            <Label
                              htmlFor={`subcat-${sub.name}`}
                              className="text-amber-800 capitalize cursor-pointer text-sm group-hover:text-amber-900 transition-colors"
                            >
                              {sub.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === "subcategory" && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
              <h2 className="text-lg font-bold text-amber-900">ห้อง</h2>
            </div>

            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-md hover:shadow-amber-100/30"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`room-${room.name}`}
                      checked={selectedRooms.includes(room._id)}
                      onCheckedChange={() => handleRoomChange(room._id)}
                      className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                    />
                    <Label
                      htmlFor={`room-${room.name}`}
                      className="font-medium text-amber-900 capitalize cursor-pointer"
                    >
                      {room.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === "category" && mode !== "all" && (
          <>
            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
                <h2 className="text-lg font-bold text-amber-900">ห้อง</h2>
              </div>

              <div className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-md hover:shadow-amber-100/30"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`room-${room.name}`}
                        checked={selectedRooms.includes(room._id)}
                        onCheckedChange={() => handleRoomChange(room._id)}
                        className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                      />
                      <Label
                        htmlFor={`room-${room.name}`}
                        className="font-medium text-amber-900 capitalize cursor-pointer"
                      >
                        {room.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
                <h2 className="text-lg font-bold text-amber-900">ประเภทย่อย</h2>
              </div>

              <div className="space-y-3">
                {subCat.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-md hover:shadow-amber-100/30"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`subcat-${sub.name}`}
                        checked={selectedSubCategories.includes(sub._id)}
                        onCheckedChange={() => handleSubCategoryChange(sub._id)}
                        className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                      />
                      <Label
                        htmlFor={`subcat-${sub.name}`}
                        className="font-medium text-amber-900 capitalize cursor-pointer"
                      >
                        {sub.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {mode === "all" && (
          <>
            {/* ห้อง */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
                <h2 className="text-lg font-bold text-amber-900">ห้อง</h2>
              </div>

              <div className="space-y-3">
                {rooms.map((room) => (
                  <div
                    key={room._id}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-md hover:shadow-amber-100/30"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`room-${room.name}`}
                        checked={selectedRooms.includes(room._id)}
                        onCheckedChange={() => handleRoomChange(room._id)}
                        className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                      />
                      <Label
                        htmlFor={`room-${room.name}`}
                        className="font-medium text-amber-900 capitalize cursor-pointer"
                      >
                        {room.name}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ประเภท + ประเภทย่อย */}
            <div className="space-y-5">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
                <h2 className="text-lg font-bold text-amber-900">ประเภท</h2>
              </div>

              <div className="space-y-4">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 hover:border-amber-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-amber-100/30"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Checkbox
                        id={cat.name}
                        checked={selectedCategories.includes(cat._id)}
                        onCheckedChange={() => {
                          handleCategoryChange(cat._id);
                          if (selectedCategories.includes(cat._id)) {
                            setSelectedSubCategories((prev) =>
                              prev.filter(
                                (s) =>
                                  !cat.subCategories
                                    .map((sc) => sc._id)
                                    .includes(s)
                              )
                            );
                          }
                        }}
                        className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 border-amber-300"
                      />
                      <Label
                        htmlFor={cat.name}
                        className="font-semibold text-amber-900 capitalize cursor-pointer"
                      >
                        {cat.name}
                      </Label>
                    </div>

                    {selectedCategories.includes(cat._id) &&
                      cat.subCategories.length > 0 && (
                        <div className="space-y-2 pl-6 border-l-2 border-amber-300/50 ml-2 animate-in slide-in-from-left-2 duration-300">
                          {cat.subCategories.map((sub) => (
                            <div
                              key={sub._id}
                              className="flex items-center space-x-3 py-1 group"
                            >
                              <Checkbox
                                id={`subcat-${sub.name}`}
                                checked={selectedSubCategories.includes(
                                  sub._id
                                )}
                                onCheckedChange={() =>
                                  handleSubCategoryChange(sub._id)
                                }
                                className="data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 border-amber-300 scale-90"
                              />
                              <Label
                                htmlFor={`subcat-${sub.name}`}
                                className="text-amber-800 capitalize cursor-pointer text-sm group-hover:text-amber-900 transition-colors"
                              >
                                {sub.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Price Range Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-500 rounded-md"></div>
            <h2 className="text-lg font-bold text-amber-900">ราคา</h2>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-amber-200/50 space-y-6">
            {/* Min Price */}
            <div className="space-y-3">
              <Label
                htmlFor="min-price"
                className="text-sm font-semibold text-amber-800 flex items-center space-x-2"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                <span>ราคาต่ำสุด</span>
              </Label>
              <div className="space-y-2">
                <Slider
                  id="min-price"
                  value={[priceRange[0]]}
                  onValueChange={([newMin]) => {
                    if (newMin <= priceRange[1])
                      setPriceRange([newMin, priceRange[1]]);
                  }}
                  min={1}
                  max={100000}
                  step={1000}
                  className="w-full [&>span:first-child]:bg-amber-200 [&>span:first-child]:h-2 [&>span:last-child]:bg-amber-500 [&_[role=slider]]:bg-white [&_[role=slider]]:border-amber-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-amber-200/40"
                />
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg px-3 py-2 border border-amber-200/60">
                  <span className="text-lg font-bold text-amber-900">
                    {toPrice(priceRange[0])}
                  </span>
                </div>
              </div>
            </div>

            {/* Max Price */}
            <div className="space-y-3">
              <Label
                htmlFor="max-price"
                className="text-sm font-semibold text-amber-800 flex items-center space-x-2"
              >
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                <span>ราคาสูงสุด</span>
              </Label>
              <div className="space-y-2">
                <Slider
                  id="max-price"
                  value={[priceRange[1]]}
                  onValueChange={([newMax]) => {
                    if (newMax >= priceRange[0])
                      setPriceRange([priceRange[0], newMax]);
                  }}
                  min={1000}
                  max={100000}
                  step={1000}
                  className="w-full [&>span:first-child]:bg-amber-200 [&>span:first-child]:h-2 [&>span:last-child]:bg-amber-500 [&_[role=slider]]:bg-white [&_[role=slider]]:border-amber-500 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-amber-200/40"
                />
                <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg px-3 py-2 border border-amber-200/60">
                  <span className="text-lg font-bold text-amber-900">
                    {toPrice(priceRange[1])}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
