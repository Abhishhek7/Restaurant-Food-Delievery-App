import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (dish, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === dish.id);
      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      // Add new item
      return [...prevCart, { ...dish, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children} {/* ✅ This ensures the app continues rendering properly */}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
