import React from 'react'
import Image from 'next/image'
import Navbar from '../Navbar'

import { SkillsResponse } from '../../types/dataTypes';


const getLinkData = async ()  => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/nav_data",{ next: { revalidate: 36 } });
  return await response.json();
};

async function WrappedMenu() {
const links = await getLinkData()

  return (
    <div>
       <Navbar linksProp={links[1]}/>
      <section id="menu" className=" mx-auto max-full   px-4  py-9 md:flex 
                                    md:bg-[left_100%_center] md:bg-[length:60%_auto]  md:bg-[url(/assets/bg-menu-2.png)] md:bg-no-repeat ">
        <div className=" grid md:grid-cols-2 gap-12 items-start md:h-full md:pl-28 pl-10 ">
          <div className=''>
            <h2 className="font-serif text-3xl md:text-6xl">Menu</h2>
            <p className="mt-3 text-stone-300">A rotating selection of classics and seasonal specials. Vegetarian options available on request.</p>
            <div className='grid md:grid-cols-3 md:w-[60vw] gap-10'>
               <ul className="mt-6 space-y-3 text-stone-300">
                <h2 className='font-serif text-3xl md:text-4xl'>Classic</h2>
              {[
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghis", "Mushroom mix, thyme, fior di latte"],
              ].map(([name, desc],id) => (
                <li key={id} className="flex items-start gap-3">
                  <span className="mt-1">🍕</span>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-stone-300 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 text-stone-300">
                <h2 className='font-serif text-3xl md:text-4xl'>Special</h2>
              {[
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
              ].map(([name, desc],id) => (
                <li key={id} className="flex items-start gap-3">
                  <span className="mt-1">🍕</span>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-stone-300 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>  
            <ul className="mt-6 space-y-3 text-stone-300">
                <h2 className='font-serif text-3xl md:text-4xl'>Arancini</h2>
              {[
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
                ["Margherita", "San Marzano, fior di latte, basil"],
                ["Diavola", "Spianata piccante, fior di latte, chilli"],
                ["Prosciutto e Rucola", "Prosciutto, rocket, parmigiano"],
                ["Funghi", "Mushroom mix, thyme, fior di latte"],
              ].map(([name, desc],id) => (
                <li key={id} className="flex items-start gap-3">
                  <span className="mt-1">🍕</span>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-stone-300 text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>  
            </div>
           
    
          </div>
         
        </div>
        {/* <Image className=' absolute bottom-[-400px] left-[1000px]  -z-10 ' height={1500} width={1500} alt='bg' src={"/assets/bg-menu.png"}/> */}
      </section>
    </div>
  )
}

export default WrappedMenu
