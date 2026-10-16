"use client"
import React, { useState } from 'react'
import { useCart } from './CartProvider'
import { useRouter } from 'next/navigation'

export default function Cart(){
  const {items, increment, decrement, removeItem, totalItems, totalPrice, clear} = useCart()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const createSummary = () => {
    let total = 0
    const lines = items.map((it:any) => {
      const unit = Number(it.price) || 0
      const qty = Number(it.qty) || 1
      const lineTotal = unit * qty
      total += lineTotal
      return `${qty} x ${it.name} @ $${unit.toFixed(2)} = $${lineTotal.toFixed(2)}`
    })

    const summaryLines = [
      '--- Catering Cart Summary ---',
      'Items:',
      ...lines.map(l => `• ${l}`),
      `Subtotal: $${total.toFixed(2)}`,
           '',
      'Please include the cart above in my enquiry. Thank you.'
    ]

    return summaryLines.join('\n')
  }

  const handleCheckout = () => {
    try{
      const summary = createSummary()
      localStorage.setItem('kitchen_cart_message', summary)
    }catch(e){}
    setOpen(false)
    router.push('/#contact')
  }

  return (
    <>
      {/* Desktop / md+: floating panel or hidden ball when empty */}
      {items.length === 0 ? (
        // show a small circular button on desktop when empty; clicking it opens the full panel
        <div className="hidden md:block fixed right-6 bottom-6 z-50">
          <button onClick={() => setOpen(true)} className="w-14 h-14 rounded-full bg-amber-700 flex items-center justify-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 0 0 6.8 21h10.4a1 1 0 0 0 .99-.86L19 13M7 13H5.4" />
            </svg>
          </button>
        </div>
      ) : (
        <aside className="hidden md:block fixed right-6 bottom-6 w-96 bg-white shadow-xl rounded-xl p-4 z-50">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h4 className="font-semibold">Cart</h4>
              <div className="text-xs text-stone-500">{totalItems} items</div>
            </div>
            <button onClick={clear} className="text-sm text-rose-600">Clear</button>
          </div>
          <div className="mt-3 max-h-72 overflow-auto space-y-2">
            {items.map(it => (
              <div key={String(it.id)} className="flex items-center gap-3 py-2">
                <div className="w-16 h-14 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                  {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.name}</div>
                  <div className="text-xs text-stone-500">Unit: ${it.price.toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={()=>decrement(it.id)} className="px-2 py-1 bg-stone-200 rounded">-</button>
                    <div className="px-2">{it.qty}</div>
                    <button onClick={()=>increment(it.id)} className="px-2 py-1 bg-stone-200 rounded">+</button>
                  </div>
                </div>
                <div className="text-sm font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                <button onClick={()=>removeItem(it.id)} className="text-sm text-rose-600">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t pt-3">
            <div className="flex items-center justify-between text-sm text-stone-600">
              <div>Subtotal</div>
              <div>${totalPrice.toFixed(2)}</div>
            </div>
            <div className="mt-3">
              <button onClick={handleCheckout} className="w-full inline-block text-center bg-amber-700 text-white px-4 py-2 rounded-lg">Checkout / Request Quote</button>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile: floating button + bottom sheet */}
      <div className="md:hidden fixed right-4 bottom-4 z-50">
        <button onClick={() => setOpen(true)} className="relative inline-flex items-center bg-amber-700 text-white px-3 py-3 rounded-full shadow-lg">
          {totalItems === 0 ? (
            <span className="inline-flex items-center justify-center w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6.4A1 1 0 0 0 6.8 21h10.4a1 1 0 0 0 .99-.86L19 13M7 13H5.4" />
              </svg>
            </span>
          ) : (
            <>
              <span className="sr-only">Open cart</span>
              <span className="mr-2">Cart</span>
              <span className="inline-flex items-center justify-center bg-rose-600 text-white text-xs w-5 h-5 rounded-full">{totalItems}</span>
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full bg-white rounded-t-xl p-4 max-h-[70vh] overflow-auto">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Cart ({totalItems})</h4>
              <button onClick={() => setOpen(false)} className="text-sm text-stone-500">Close</button>
            </div>
            <div className="mt-3 space-y-3">
              {items.length === 0 ? <p className="text-sm text-stone-500">No items</p> : (
                items.map(it => (
                  <div key={String(it.id)} className="flex items-center gap-3 py-2">
                    <div className="w-12 h-10 bg-stone-100 rounded overflow-hidden flex-shrink-0">
                      {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-stone-500">Unit: ${it.price.toFixed(2)}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={()=>decrement(it.id)} className="px-2 py-1 bg-stone-200 rounded">-</button>
                        <div className="px-2">{it.qty}</div>
                        <button onClick={()=>increment(it.id)} className="px-2 py-1 bg-stone-200 rounded">+</button>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 border-t pt-3">
              <div className="flex items-center justify-between text-sm text-stone-600">
                <div>Subtotal</div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
              <div className="mt-3">
                <button onClick={handleCheckout} className="w-full inline-block text-center bg-amber-700 text-white px-4 py-2 rounded-lg">Checkout / Request Quote</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

