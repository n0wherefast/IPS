"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type CartItem = {
  id: string | number,
  name: string,
  price: number,
  qty: number,
  image?: string
}

type CartContextType = {
  items: CartItem[],
  addItem: (item: Omit<CartItem,'qty'>) => void,
  removeItem: (id: string | number) => void,
  increment: (id: string | number) => void,
  decrement: (id: string | number) => void,
  clear: () => void,
  totalItems: number,
  totalPrice: number,
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default function CartProvider({children}:{children:React.ReactNode}){
  const [items,setItems] = useState<CartItem[]>([])

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('kitchen_cart')
      if(raw) setItems(JSON.parse(raw))
    }catch(e){}
  },[])

  useEffect(()=>{
    try{ localStorage.setItem('kitchen_cart', JSON.stringify(items)) }catch(e){}
  },[items])

  const addItem = (item: Omit<CartItem,'qty'>) =>{
    setItems(prev=>{
      const found = prev.find(p=>String(p.id) === String(item.id))
      if(found){
        return prev.map(p=> p.id === found.id ? {...p, qty: p.qty + 1} : p)
      }
      return [...prev, {...item, qty: 1}]
    })
  }

  const removeItem = (id: string | number) => setItems(prev=> prev.filter(p=> String(p.id) !== String(id)))

  const increment = (id: string | number) => setItems(prev=> prev.map(p=> String(p.id) === String(id) ? {...p, qty: p.qty+1} : p))
  const decrement = (id: string | number) => setItems(prev=> prev.map(p=> {
    if(String(p.id) !== String(id)) return p
    const next = p.qty - 1
    return next <= 0 ? p : {...p, qty: next}
  }).filter(Boolean))

  const clear = () => setItems([])

  const totalItems = items.reduce((s,i)=> s + i.qty, 0)
  const totalPrice = items.reduce((s,i)=> s + i.qty * i.price, 0)

  const value: CartContextType = {items, addItem, removeItem, increment, decrement, clear, totalItems, totalPrice}

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
