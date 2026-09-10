import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gramsetu_cart');
      if (saved) return JSON.parse(saved);
      // Provide an initial item in cart for demo exploration
      return [
        {
          id: "prod-1",
          name: "Organic Sharbati Wheat",
          price: 45,
          unit: "kg",
          quantity: 20,
          sellerId: "seller-1",
          sellerName: "Nitin Imade Kisan Sahakari Group",
          village: "Dindori",
          district: "Nashik",
          state: "Maharashtra",
          image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gramsetu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            quantity: quantity,
            sellerId: product.sellerId,
            sellerName: product.sellerName,
            village: product.village,
            district: product.district,
            state: product.state,
            image: product.images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
          }
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + deliveryFee;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        total,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
