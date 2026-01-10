
'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";
function MenuSec() {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start md:h-[55vh]">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
           className=''>
            <h2 className="font-serif text-3xl sm:text-4xl">Menu highlights</h2>
            <p className="mt-3 text-stone-300">A rotating selection of classics and seasonal specials. Vegetarian options available on request.</p>
            <ul className="mt-6 space-y-3 text-stone-200">
              {[
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
              ].map(([name, desc]) => (
                <li key={name} className="flex items-start gap-3">
                  <span className="mt-1">🍕</span>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-stone-300 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href="../pages/menu" className=" mt-16 ml-6 inline-flex items-center rounded-2xl px-6 py-3 bg-white/90 text-stone-900 hover:bg-white">View menu</a>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                     className="grid grid-cols-2 gap-4">
            {/* Replace with real dish images */}
            {["/pizzas(11).webp","/cannoli-2.webp","/hotchips.webp","/arancini-3.webp"].map((src) => (
              <Image height={500} width={500} key={src} src={src} alt="Pizza" className="rounded-2xl border border-stone-200 object-cover w-full h-40 sm:h-56"/>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default MenuSec
