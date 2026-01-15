'use client'
import React from 'react'
import {motion} from'framer-motion'

function WrappedPackage({packProps}:any) {
  return (
     <section  className="border-y border-stone-200 text-stone-700">
        <div className="mx-auto md:max-w-[80vw] px-4 py-16 ">
          <h2 className="font-sans text-3xl sm:text-5xl text-stone-700">Packages</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {packProps.map((p:any,id:number) => (
              <motion.div initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }} key={id} className="rounded-2xl bg-white border border-rose-500 p-6 shadow-sm">
                <div className="flex items-baseline justify-between"> 
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span className="text-sm text-stone-600">{p.price}</span>
                </div>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {p.items.map((i:string) => (
                    <li key={i} className="flex gap-2"><span>✓</span><span>{i}</span></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
           <div className="mx-auto mt-5 max-w-7xl px-4 pt-5 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center text-md font-medium text-stone-700   ">
          {[
            "Extra salads available upon discussion",
            "Waiter available for 220$ extra",
            "Kids from 6 up to 10 years old $15 (pizza only)",
            "packages Special, A-B Minimum party spend $1000",
            "packages C-D Minimum party spend $1300",
          ].map((t) => (
            <div key={t} className=" flex items-center justify-center px-1 py-1 rounded-xl bg-stone-50 border border-rose-500">{t}</div>
          ))}
        </div>
        </div>
      </section> 
  )
}

export default WrappedPackage




