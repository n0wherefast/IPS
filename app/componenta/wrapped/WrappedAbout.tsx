'use client'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'

function WrappedAbout({aboutProp}:any) {
    console.log(aboutProp.image)
  return (
     <section id="about" className="bg-white border-y border-stone-200">
        <motion.div initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }} className="mx-auto max-w-7xl md:h-[60vh] px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image src={aboutProp.image} height={500} width={500} alt="Our pizzaiolo by the oven" className="rounded-2xl border border-stone-200 w-full object-cover h-96"/>
          </div>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Tradition, fire and good company</h2>
            <p className="mt-4 text-stone-700">Born in Italy, baked in Sydney. We ferment our dough for up to 48 hours for a light, airy crust, and cook at 450°C in our mobile wood‑fired oven. We bring the pizzeria experience to your venue.</p>
            <ul className="mt-6 space-y-2 text-stone-700">
              {[
                "Fully insured and council compliant",
                "Food‑safe, professional setup",
                "Italian/English speaking staff",
              ].map((b) => (
                <li key={b} className="flex gap-2"><span>•</span>{b}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

  )
}

export default WrappedAbout
