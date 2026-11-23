import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function WrappedHero({heroProp}:any) {
  
  return (
    <>
      <section className="relative isolate overflow-hidden h-[90vh] md:h-screen">
          <div className="absolute inset-0 -z-10">
            <Image loading='lazy' blurDataURL={heroProp.image} height={1000} width={1000} src={heroProp.image} alt="Wood-fired pizza from our mobile oven" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-900/20 to-transparent" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-28 sm:py-40">
            <div className="max-w-2xl text-white">
              <h1 className="font-serif text-4xl sm:text-6xl leading-tight">Authentic <p className=' text-amber-300'> <strong>Wood Fired </strong></p> Pizza, crafted in Sydney</h1>
              <p className="mt-4 text-lg sm:text-xl text-stone-100/90">Catering for weddings, corporate and private events. Hand‑stretched dough.</p>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                {/* <Link href="/kitchen-catering" className="text-sm sm:text-lg inline-flex items-center rounded-2xl px-5 py-3 bg-amber-600 text-white shadow hover:bg-amber-700 hover:shadow-lg transition">Kitchen Menu</Link> */}
                <Link href="#packages" className="text-sm sm:text-lg inline-flex items-center rounded-2xl px-5 py-3 text-white bg-red-600 hover:bg-red-800 transition-all">Pizza Packages</Link>
                {/* <Link href="/canape-catering#canape-packages-title" className="text-sm sm:text-lg inline-flex items-center rounded-2xl px-5 py-3 bg-emerald-800 text-white shadow hover:bg-emerald-700 hover:shadow-lg transition">Canapé Packages</Link> */}
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default WrappedHero 
