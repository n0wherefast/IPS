'use client'
import React, { useEffect, useState } from 'react'
import {FaBars} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'
import Social from './Social'


export interface CONTEXT {
  isDarkMode?:boolean,
  isLangSwitch?:boolean,
  setIsLangSwitch? : Function,
  setIsDarkMode? : Function,
  handleDarkMode? :Function | any,
  handleLangSwitch? : Function | any,
}


function Navbar({linksProp}:any) {
  const [isOpen,setIsOpen] = useState(false)
  const [isClick,setIsClick] = useState(false)
  const [isMenu , setIsMenu] = useState<boolean>()
  // const [isNameChanged,setIsNameChanged] = useState(true)
  const  [size,setSize] =useState(800)
  
// console.log(linksProp[0].isMenuPage)
  useEffect(() => {
  
    function handleResize() {
      if(window.innerWidth > 800 || window.innerWidth < 500){
        setIsOpen(false)
        setIsClick(false)
        window.innerWidth > 500 ? setIsMenu(true) : setIsMenu(false)
      } 
      setSize(window.innerWidth)
    }
     window.innerWidth > 500 ? setIsMenu(true) : setIsMenu(false)
     window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);
const handleNavClick = (path: string) => {
  if (path === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.querySelector(path); 
    el?.scrollIntoView({ behavior: "smooth" }); 
  }
};
  
  return (
    <header  className = { isOpen?` p-2 transition-all duration-500 ease-in-out bg-zinc-900 text-white sticky top-0 z-10  ` : 
                                  `transition-all duration-500 ease-in-out h-20 flex items-center bg-zinc-900  text-white  sticky top-0 z-10`}>

        <div className={isOpen ? ` min-h-96 transition-all ease-in-out duration-300  container mx-auto flex  p-3 flex-col  md:flex-row justify-around items-center md:justify-start` :
                                 ` h-24 transition-all ease-in-out duration-200  container mx-auto flex  p-3 flex-col  md:flex-row justify-between items-center md:justify-start`}>
                
        <div className='flex flex-row w-full md:w-auto justify-between items-center m-2 md:p-0'>
                
                  <Image
                  alt="italian pizza catering logo"
                  className=" rounded-2xl w-16 h-12 md:w-20 md:h-14"
                  src='/logo2.webp'
                  width={100}
                  height={100}
                  /> 
                
                <p className=" font-medium md:mb-0">
                  <Link href="#home" className="ml-2 text-md sm:text-3xl font-semibold">
                     Italian Pizza Catering
                  </Link>
                </p>
                
                <button id='button menu' aria-label='button menu' className= {isOpen? `ml-16 flex rotate-180 md:hidden text-rose-500 transition-all ease-in duration-200`:`ml-16 hover:bg-sky-900 p-2 rounded-full rotate-0 flex md:hidden text-white transition-all ease-in `  }
                        onClick={()=>(setIsOpen(!isOpen) ,setIsClick(false))}
                >
                { isOpen ? <IoMdClose size={30} /> :   <FaBars size={25} color='white'/>}  
                </button>

                
        </div>
        <nav onClick={()=>setIsOpen(false)} className={isOpen? ` gap-2  w-full md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-600	flex  flex-col md:flex-row items-start text-base justify-start  ` :
                                 ` hidden  md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-600	md:flex  items-center text-base justify-center`}>
          <ul className='flex flex-col md:flex-row gap-2'>
           {
           linksProp.map((link:any,id:any)=>{
              return(
               <li key={id}>
                <Link  href={link.path} onClick={()=>handleNavClick(link.path)}  className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
                  {link.name}
                </Link>
              </li>
              )
            })
           }
           </ul>
                 
        </nav>
        
        {linksProp[0].isMenuPage ?  null :
        <>
        <div  className= {isOpen? `md:inline-flex items-center  py-1 px-3     mt-4 md:mt-0` 
                      :  ` hidden md:inline-flex items-center ml-5 py-1 px-3   text-amber mt-4 md:mt-0  ` }>
          <Social/>
        </div>
          <Link
            onClick={()=>setIsOpen(false)}
            href="#contact"
            className= {isOpen? `md:inline-flex items-center text-white  bg-gray-700 border-0 py-1 px-3 transition-all ease-in focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0` 
                      :  ` hidden md:inline-flex items-center ml-5 border-rose-500 border py-1 px-3 transition-all ease-in focus:outline-none hover:bg-red-700 rounded text-lg text-amber mt-4 md:mt-0 hover:text-white ` }>
            Contact
          </Link>  
         </>
         }
                

        </div>
    </header>
  )
}

export default Navbar
