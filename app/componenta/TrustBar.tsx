'use client'
import React from 'react'
import { motion } from "framer-motion";

function TrustBar() {
  return (
    <section id="menu" className="bg-white border-y border-stone-200">
       <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm">
          {[
            "Hand‑stretched dough",
            "48h cold fermentation",
            "Locally sourced ingredients",
            "Catering across Sydney",
          ].map((t) => (
            <div key={t} className="px-3 py-2 rounded-xl bg-stone-50 border border-rose-400">{t}</div>
          ))}
        </div>
        </motion.div>
      </section>
  )
}
export default TrustBar
