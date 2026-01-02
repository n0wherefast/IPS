import React from 'react'

function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Menu highlights</h2>
            <p className="mt-3 text-stone-600">A rotating selection of classics and seasonal specials. Vegetarian and gluten‑free options available on request.</p>
            <ul className="mt-6 space-y-3 text-stone-800">
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
                    <p className="text-stone-600 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Replace with real dish images */}
            {["/menu-1.jpg","/menu-2.jpg","/menu-3.jpg","/menu-4.jpg"].map((src) => (
              <img key={src} src={src} alt="Pizza" className="rounded-2xl border border-stone-200 object-cover w-full h-40 sm:h-56"/>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Menu
