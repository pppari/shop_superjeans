import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import debounce from "lodash.debounce";
import { mainColorImg } from "@/lib/imagePath";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function SearchProduct() {
    const [products, setProducts] = useState([]); // State to store the search results
    const [q, setQ] = useState(""); // State to hold the search query
    const [loading, setLoading] = useState(false); // State to track loading state

    // Debounced function to fetch products
    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!query) {
                setProducts([]); // Clear results when search is empty
                setLoading(false);
                return;
            }

            setLoading(true); // Set loading to true while fetching data
            try {
                const response = await axios.get(`/api/products?q=${query}`);
                const data = response.data;
                setProducts(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false); // Set loading to false after the fetch completes
            }
        }, 1000), // Wait for 2 seconds after typing stops
        []
    );

    // Update query state and trigger debounced search
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setQ(query);
        setLoading(true); // Set loading to true immediately while debouncing
        debouncedSearch(query); // Call the debounced function
    };

    useEffect(() => {
        // Cancel the debounced function if the component unmounts or before a new request
        return () => {
            debouncedSearch.cancel(); // Clean up the debounced function
        };
    }, [debouncedSearch]);

    useEffect(() => {
        if (!q) {
            setProducts([]); // Clear products if the search is empty
            setLoading(false); // Reset loading if search is empty
        }
    }, [q]); // Run this effect when `q` changes

    return (
        <div className="relative">
            <Input
                type="text"
                value={q}
                onChange={handleSearchChange} // Update state and trigger debounce
                placeholder="Search products..."
                className="w-full border border-gray-300 shadow-sm"
            />

            {/* Display search results */}
            {q && (
                <div className="mt-2 max-h-96 overflow-auto absolute z-50 w-full bg-white shadow-lg rounded-lg">
                    {loading ? (
                        <div className="flex items-center space-x-4 p-4">
                            <Skeleton className="h-18 w-18" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ) : products.length > 0 ? (
                        <ul className="border border-gray-300 rounded-lg shadow-sm">
                            {products.map((product) => (
                                <li
                                    key={product.id}
                                    className="p-4 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Link href={`/products/${product._id}`} className="flex items-center gap-4">
                                        <img
                                            src={mainColorImg(product._id, product.main_img)}
                                            className="h-18 w-18 object-cover rounded-md"
                                            alt={product.name} // Always include an alt attribute for accessibility
                                        />
                                        <div>
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.sku}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center p-4 text-gray-500">No products found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchProduct;
