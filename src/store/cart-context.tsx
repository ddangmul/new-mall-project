"use client";

import { Item, ItemWithQuantity } from "../../types/types";
import CartModal from "@/components/cart/cart-modal";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

interface CartContextType {
  cartItems: ItemWithQuantity[];
  addCartHandler: (item: Item, quantity: number) => void;
  deleteCartHandler: (items: Item[] | Item) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  totalPrice: number;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  confirmOpenCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addCartHandler: (_item) => {},
  deleteCartHandler: (_item) => {},
  updateItemQuantity: (_id, _quantity) => {},
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
  const [cartItems, setCartItems] = useState<ItemWithQuantity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); //Hydration 오류 방지
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
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

  const deleteCartHandler = (items: Item[] | Item) => {
    setCartItems((prev) => {
      const idsToDelete = Array.isArray(items)
        ? items.map((item) => item.id)
        : [items.id];
      return prev.filter((cartItem) => !idsToDelete.includes(cartItem.id));
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === id ? { ...item, quantity } : item
      )
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
