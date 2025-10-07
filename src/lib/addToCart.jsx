// lib/cart/addToCart.js
import axios from "@/lib/axios";
import getToken from "@/hooks/getToken";
import { jwtDecode } from "jwt-decode";
import { useCartStore } from "@/store/useCartStore";

const addToCart = async ({ productId, productColorId, price, quantity = 1 }) => {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const decoded = jwtDecode(token);
    const userId = decoded?.id;
    if (!userId) throw new Error("Invalid token");

    try {
        const res = await axios.post("/api/cart/add", {
            productId,
            productColorId,
            price,
            quantity,
            userId,
        });
          const count = res.data.cart.length;

  // sync localStorage
  localStorage.setItem('cartCount', count);

  // update our store directly
  useCartStore.getState().setCount(count);
        return res.data;
    } catch (err) {
        console.error("Failed to add to cart:", err);
        throw err;
    }
};

export default addToCart;
