import Link from 'next/link'
import React from 'react'

function TopBar() {
  return (
   <div className="bg-stone-900 text-stone-100 text-sm sticky top-0 z-10 ">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
            <p className="tracking-wide">Wood‑Fired • Sydney & Surrounds</p>
            <Link href="#contact" className="underline underline-offset-4">Enquire now</Link>
        </div>
   </div>
  )
}

export default TopBar
