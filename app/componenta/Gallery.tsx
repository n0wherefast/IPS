import React from 'react'

function Gallery() {
  return (
     <section id="gallery" className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl sm:text-4xl">Gallery</h2>
          <a href="#contact" className="text-sm underline underline-offset-4">Book your date →</a>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["/g-1.jpg","/g-2.jpg","/g-3.jpg","/g-4.jpg","/g-5.jpg","/g-6.jpg","/g-7.jpg","/g-8.jpg"].map((src) => (
            <img key={src} src={src} alt="Event" className="rounded-2xl border border-stone-200 object-cover w-full h-36 sm:h-48"/>
          ))}
        </div>
      </section>
  )
}

export default Gallery
