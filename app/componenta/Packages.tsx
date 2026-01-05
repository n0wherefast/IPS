import React from 'react'

function Packages() {
  return (
     <section id="packages" className="bg-stone-100 border-y border-stone-200">
        <div className="mx-auto md:max-w-[80vw] px-4 py-16 md:h-[95vh]">
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-700">Packages</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {name: "Party", price: "from $28 pp", items: ["30 min setup ","3 hours service","Choice of 3: Traditional Pizza Choice of 2: Premium Pizza","Dessert: Nutella Pizza","Up to 40 guests"]},
              {name: "Party", price: "from $28 pp", items: ["30 min setup ","3 hours service","Choice of 3: Traditional Pizza Choice of 2: Premium Pizza","Dessert: Nutella Pizza","Up to 40 guests"]},
              {name: "Party", price: "from $28 pp", items: ["30 min setup ","3 hours service","Choice of 3: Traditional Pizza Choice of 2: Premium Pizza","Dessert: Nutella Pizza","Up to 40 guests"]},
              {name: "Party", price: "from $28 pp", items: ["30 min setup ","3 hours service","Choice of 3: Traditional Pizza Choice of 2: Premium Pizza","Dessert: Nutella Pizza","Up to 40 guests"]},
              {name: "Special", price: "from $28 pp", items: ["30 min setup ","3 hours service","Choice of 3: Traditional Pizza Choice of 2: Premium Pizza","Dessert: Nutella Pizza","Up to 40 guests"]},
              
            ].map((p) => (
              <div key={p.name} className="rounded-2xl bg-white border border-rose-500 p-6 shadow-sm">
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
           <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-lg font-bold text-stone-700   ">
          {[
            "Waiter available for 200$ extra",
            "Kids from 6 up to 10 years old $15 (pizza only)",
            "package A-B Minimum party spend $1000",
            "package C-D Minimum party spend $1300",
          ].map((t) => (
            <div key={t} className="px-3 py-2 rounded-xl bg-stone-50 border border-rose-500">{t}</div>
          ))}
        </div>
        </div>
      </section> 
  )
}

export default Packages
