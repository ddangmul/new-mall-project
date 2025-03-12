import { Item } from "@/assets/types";
import { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cartItems: Item[];
  addCartHandler: (item: Item, quantity: number) => void;
  deleteCartHandler: (item: Item) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addCartHandler: (item) => {},
  deleteCartHandler: (item) => {},
  updateItemQuantity: (id, quantity) => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); //Hydration 오류 방지

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addCartHandler = (item: Item, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity } : i));
      }
      return [...prev, { ...item, quantity: quantity || 1 }];
    });
  };

  const deleteCartHandler = (item: Item) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== item.id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const contextValue: CartContextType = {
    cartItems,
    addCartHandler,
    deleteCartHandler,
    updateItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
