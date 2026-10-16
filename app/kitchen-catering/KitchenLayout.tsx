import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  children: React.ReactNode,
  heroImage?: string,
  title?: string,
  subtitle?: string,
  ctaLabel?: string,
  ctaHref?: string,
}

export default function KitchenLayout({children, heroImage="/wep_files/placeholder-food.webp", title="Kitchen Catering", subtitle="", ctaLabel, ctaHref}:Props){
  return (
    <main className="bg-amber-50 text-stone-900 min-h-screen">
      <section className="relative w-full h-56 sm:h-72 md:h-96 bg-stone-800">
        <Image src={heroImage} alt={title} fill className="object-cover" priority={false}/>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-700/25 to-transparent" />
        <div className="container mx-auto relative z-10 h-full flex items-center px-4">
          <div className="text-white max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif leading-tight">{title}</h1>
            {subtitle ? <p className="mt-2 text-sm sm:text-base md:text-lg text-amber-100">{subtitle}</p> : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-4">
                <Link href={ctaHref} className="inline-flex items-center bg-amber-600 hover:bg-amber-500 transition-colors text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium">
                  {ctaLabel}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        {children}
      </div>
    </main>
  )
}
