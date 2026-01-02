import Image from 'next/image'
import React from 'react'

function WrappedHero() {
  return (
    <>

    <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Replace with your wood-fired hero image */}
          <img src="/hero.jpg" alt="Wood-fired pizza from our mobile oven" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-900/20 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-28 sm:py-40">
          <div className="max-w-2xl text-white">
            <h1 className="font-serif text-4xl sm:text-6xl leading-tight">Authentic wood‑fired pizza, crafted in Sydney</h1>
            <p className="mt-4 text-lg sm:text-xl text-stone-100/90">Catering for weddings, corporate and private events. Hand‑stretched dough, San Marzano tomatoes, fior di latte.</p>
            <div className="mt-8 flex gap-4">
              <a href="#contact" className="inline-flex items-center rounded-2xl px-6 py-3 bg-rose-600 text-white shadow hover:shadow-lg transition">Get a quote</a>
              <a href="#menu" className="inline-flex items-center rounded-2xl px-6 py-3 bg-white/90 text-stone-900 hover:bg-white">View menu</a>
            </div>
          </div>
        </div>
      </section>
          </>
  )
}

export default WrappedHero
