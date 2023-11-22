import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, authToken } from '../../utils/ApiConfig'; 


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};

const fetchCartData = async () => {
  try {
    const CartData = await getCart();
    return CartData;
  } catch (error) {
    throw new Error('Error fetching Cart:', error);
  }
};

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const [CartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = `Bearer ${authToken}`; 
      const isLoggedIn = !!authToken; 

      if (isLoggedIn) {
        try {
          const CartData = await fetchCartData();
          console.log('Data Cart yang Diterima:', CartData);
          const count = CartData.length;
          setCart(CartData);
          setCartCount(count);


        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {

  }, [Cart])

  return (
    <CartContext.Provider value={{ Cart, CartCount, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
