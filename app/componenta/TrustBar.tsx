import React from 'react'

function TrustBar() {
  return (
    <section className="bg-white border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-sm">
          {[
            "Hand‑stretched dough",
            "48h cold fermentation",
            "Locally sourced ingredients",
            "Catering across Sydney",
          ].map((t) => (
            <div key={t} className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200">{t}</div>
          ))}
        </div>
      </section>
  )
}

export default TrustBar
