import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist } from '../../utils/ApiConfig';

// Buat konteks
const WishlistContext = createContext();

// Custom hook untuk mengakses konteks
export const useWishlist = () => {
  return useContext(WishlistContext);
};

// Fungsi untuk mengambil data wishlist
const fetchWishlistData = async () => {
  try {
    const wishlistData = await getWishlist();
    return wishlistData;
  } catch (error) {
    throw new Error('Error fetching wishlist:', error);
  }
};

// Komponen penyedia (provider) untuk konteks wishlist
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wishlistData = await fetchWishlistData();
        // Ambil jumlah wishlist dari data yang diterima dari API
        const count = wishlistData.length;
        setWishlist(wishlistData);
        setWishlistCount(count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('from context', wishlist.length)
  }, [wishlist])

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
