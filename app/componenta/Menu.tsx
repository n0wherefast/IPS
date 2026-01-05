import React from 'react'

function Menu() {
  return (
    <section id="menu" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className=' md:h-[55vh]'>
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Replace with real dish images */}
            {["/assets/wep_files/pizzas (9).webp","/assets/wep_files/pizzas (7).webp","/assets/wep_files/pizzas (5).webp","/assets/wep_files/arancini (2).webp"].map((src) => (
              <img key={src} src={src} alt="Pizza" className="rounded-2xl border border-stone-200 object-cover w-full h-40 sm:h-56"/>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Menu
