"use client";

import { Item } from "../../types/types";
import CartModal from "@/components/cart/cart-modal";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

interface CartContextType {
  cartItems: Item[];
  addCartHandler: (item: Item, quantity: number) => void;
  deleteCartHandler: (item: Item) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  totalPrice: number;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  confirmOpenCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addCartHandler: (item) => {},
  deleteCartHandler: (item) => {},
  updateItemQuantity: (id, quantity) => {},
  totalPrice: 0,
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  confirmOpenCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); //Hydration 오류 방지
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmOpenCart = () => {
    router.push("/cart"); // 장바구니 페이지로 이동
    setIsModalOpen(false); // 모달 닫기
  };

  const addCartHandler = (item: Item, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity } : i));
      }
      return [...prev, { ...item, quantity: quantity || 1 }];
    });
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

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
    totalPrice,
    isModalOpen,
    openModal,
    closeModal,
    confirmOpenCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <CartModal />
    </CartContext.Provider>
  );
}
