import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, getCart, authToken } from '../../utils/ApiConfig'; 


const WishlistContext = createContext();


export const useWishlist = () => {
  return useContext(WishlistContext);
};

const fetchWishlistData = async () => {
  try {
    const wishlistData = await getWishlist();
    return wishlistData;
  } catch (error) {
    throw new Error('Error fetching wishlist:', error);
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = `Bearer ${authToken}`; 
      const isLoggedIn = !!authToken; 

      if (isLoggedIn) {
        try {
          const wishlistData = await fetchWishlistData();
          const count = wishlistData.length;
          setWishlist(wishlistData);
          setWishlistCount(count);

          const cartData = await getCart();
          const cartCount = cartData.length;
          setCart(cartData);
          setCartCount(cartCount);



        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, setWishlist, cart, cartCount, setCart }}>
      {children}
    </WishlistContext.Provider>
  );
};
