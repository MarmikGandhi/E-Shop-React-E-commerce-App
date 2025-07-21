import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

// ✅ EXPORT useCart hook
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const add = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const remove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
  setCart(prev =>
    prev
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0) // 🔥 removes item if quantity drops to 0
  );
};


  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, add, remove, increaseQty, decreaseQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
