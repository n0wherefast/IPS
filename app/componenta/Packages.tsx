import React from 'react'

function Packages() {
  return (
     <section id="packages" className="bg-stone-100/70 border-y border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-serif text-3xl sm:text-4xl">Packages</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {name: "Party", price: "from $25 pp", items: ["2 hours service","3 pizza choices","Up to 40 guests"]},
              {name: "Wedding", price: "from $35 pp", items: ["3 hours service","4 pizza choices","Up to 120 guests"]},
              {name: "Corporate", price: "Custom", items: ["Invoice friendly","Dietary options","Multiple shifts"]},
            ].map((p) => (
              <div key={p.name} className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{p.name}</h3>
                  <span className="text-sm text-stone-600">{p.price}</span>
                </div>
                <ul className="mt-4 space-y-2 text-stone-700">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-2"><span>✓</span><span>{i}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Packages
