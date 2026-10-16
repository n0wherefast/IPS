"use client"
import React from 'react'
import Image from 'next/image'
import { useCart } from '../componenta/CartProvider'

export default function DishList({byCat}:{byCat: Record<string, any[]>}){
  const { addItem } = useCart()

  return (
    <div className="bg-amber-50/30 rounded-lg p-4">
      <div className="space-y-8">
        {Object.keys(byCat).map(cat => (
          <div key={cat}>
            <h2 className="text-2xl font-semibold text-amber-700 mb-3">{cat}</h2>
            <ul className="space-y-4">
              {byCat[cat].map((dish:any) => (
                <li key={dish.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-amber-200 pb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-28 h-20 md:w-32 md:h-24 rounded overflow-hidden bg-amber-100 flex-shrink-0">
                      <Image loading="lazy" src={dish.image || '/wep_files/placeholder-food.webp'} alt={dish.name} width={224} height={160} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-amber-900">{dish.name}</p>
                      {dish.description && <p className="text-sm text-amber-700">{dish.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <div className="text-amber-800 font-semibold">${Number(dish.price || 0).toFixed(2)}</div>
                    <button onClick={() => addItem({id: dish.id, name: dish.name, price: Number(dish.price || 0), image: dish.image})} className="inline-flex items-center bg-amber-600 hover:bg-amber-500 text-white px-3 py-1 rounded">+</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
