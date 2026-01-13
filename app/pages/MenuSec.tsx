'use client'
import Image from 'next/image'
import {useEffect,useMemo,useState} from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';






             
const REVIEWS_TO_SHOW = 4;
function MenuSec() {
const pizzaRotation  = useMemo(()=>([
                ["Salsiccia e patate", "White base, potato, sausage, rocket, parmesan\n"],
                ["Napoli", "Tomato, mozzarella, anchovies, olives, capers"],
                ["Boscaiola", "Tomato, mozzarella, sausage, mushroom"],
                ["Capricciosa", "Tomato, mozzarella, ham, mushrooms, olives"],
                ["Alessandro", "Tomato, mozzarella, truffle paste, hot salami, Mascarpone, mushroom"],
                ["Genovese", "Pesto, sundried tomato, zucchini flower"],
                ["Rustica", "Tomato, mozzarella, olives, ham, hot salami, pork sausage, onion"],
                ["San Daniele", "Tomato, mozzarella, prosciutto, rocket, parmesan"],
                ["Bufala", "Tomato, mozzarella, bufala, sundried tomato, parmesan"],
                ["Bella", "tomato mozzarella mushrooms smoked cheese, pepperoni"],
              ]),[])

const [pizzaRot, setPizza] = useState(() => pizzaRotation.slice(0, REVIEWS_TO_SHOW));

    useEffect(()=>{
        const shuffled = [...pizzaRotation].sort(() => 0.5 - Math.random());
         setPizza(shuffled.slice(0, REVIEWS_TO_SHOW));
        //  return shuffled.slice(0, count);
    },[pizzaRotation])

  return (
    <section  className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start md:h-[55vh]">
          <motion.div
          initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
           className=''>
            <h2 className="font-serif text-3xl text-stone-200 sm:text-4xl">Menu highlights</h2>
            <p className="mt-3 text-stone-300">A selection of most requested best pizzas. Vegetarian gluten‑free options is available on request.</p>
            <ul className="mt-6 space-y-3 text-stone-200">
              {pizzaRot.map(([name, desc]) => (
                <li key={name} className="flex items-start gap-3">
                  <span className="mt-1">🍕</span>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-stone-300 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="../pages/menu" className=" mt-16 ml-6 inline-flex items-center rounded-2xl px-6 py-3 bg-white/90 text-stone-900 hover:bg-white">View menu</Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                     className="grid grid-cols-2 gap-4">
            {/* Replace with real dish images */}
            {["/pizzas (2).webp","/cannoli-2.webp","/hotchips.webp","/arancini2.webp"].map((src) => (
              <Image loading='lazy' blurDataURL={src} height={500} width={500} key={src} src={src} alt="Pizza" className="rounded-2xl border border-stone-200 object-cover w-full h-40 sm:h-56"/>
            ))}
          </motion.div>
        </div>
      </section>
  )
}

export default MenuSec
