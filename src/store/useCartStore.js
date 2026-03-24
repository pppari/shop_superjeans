import {create} from 'zustand';
import axios from '@/lib/axios';

export const useCartStore = create((set, get) => ({
  count: 0,

  // setter for manual updates (e.g. from storage or custom events)
  setCount: (c) => set({ count: c }),

  // fetch from your API and sync both state & localStorage
  fetchCart: async (userId) => {
    try {
      const res = await axios.get(`/api/cart/${userId}`);
      const cnt = res.data.items.length;
      set({ count: cnt });
      localStorage.setItem('cartCount', String(cnt));
    } catch (err) {
      console.error('fetchCart error', err);
    }
  },
}));
