'use client'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// function Navbar() {
//   return (
//     <>
//     <header className="bg-gray-400  border-b-emerald-600 md:sticky top-0 z-10 text-gray-600	">
//       <div className="container mx-auto flex p-2 sm:p-3 flex-col md:flex-row items-center">
//         <section className='flex  items-center justify-beetween bg-red-300  h-14   p-2 w-full'>
//             <div className='flex  items-center justify-center h-14 bg  p-2'>
                // {/* <Image
                //   alt="italian garden logo"
                //   className="w-12 h-12"
                //   src='/logo.png'
                //   width={50}
                //   height={50}
                //   /> */}
//                 <div className=" flex items-center justify-center title-font font-medium text-emerald-800   w-full h-12">
//                   <Link href="#about" className="ml-3 text-md sm:text-3xl font-semibold">
//                     Italian Garden
//                   </Link>
//                 </div>
//           </div>

//         <nav className=" ml-3 text-sm sm:text-2xl md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-800	flex flex-wrap items-center  justify-center">
//           <Link href="#about"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
//             Home
//           </Link>
//           <Link href="#skills"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
//             Package
//           </Link>
//           <Link href="#skills"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
//             Menu
//           </Link>
//           <Link href="#skills"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
//             Service
//           </Link>
//           <Link href="#contact"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
//             Contact
//           </Link>
//         </nav>
//       </section>
        
       
        
//         {/* <Link
//           href="#contact"
//           className="inline-flex items-center w-24 h-10 bg-emerald-600 border-0 py-1 px-3 text-white focus:outline-none hover:bg-emerald-700 rounded text-base mt-4 md:mt-0">
//           Hire Me
//           <ArrowRightIcon className="w-4 h-4 ml-1" />
//         </Link> */}
//       </div>
//     </header>
//     </>
//   )
// }

// export default Navbar
import React, { useEffect, useState } from 'react'

import {IoIosSettings} from 'react-icons/io'
import {FaBars} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

import Image from 'next/image'
import itaFlag from "../asset/italy_flags_flag_17018.webp"
import engFlag from "../asset/united_kingdom_flags_flag_17079.webp"
import Link from 'next/link'

export interface CONTEXT {
  isDarkMode?:boolean,
  isLangSwitch?:boolean,
  setIsLangSwitch? : Function,
  setIsDarkMode? : Function,
  handleDarkMode? :Function | any,
  handleLangSwitch? : Function | any,
}


function Navbar() {
  const [isOpen,setIsOpen] = useState(false)
  const [isClick,setIsClick] = useState(false)
  const [isMenu , setIsMenu] = useState<boolean>()
  const [isNameChanged,setIsNameChanged] = useState(true)
  const  [size,setSize] =useState(800)
 

  // const handleLangSwitch = () => {
  //   setIsLangSwitch(!isLangSwitch)
  //   console.log (isLangSwitch)
  // }
  
// console.log(size)
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



  // const  menuSettings = () =>{
  //   return(
  //                       <div  onClick={()=>setIsClick(!isClick)} className= {` cursor-pointer flex  md:inline-flex md:items-center md:border-0  text-xl mt-4 md:mt-0 hover:scale-125 hover:text-amber-500 transition-all `}>
  //                         <button 
  //                         // className=" flex items-center justify-center relative h-[30px] w-24 overflow-hidden rounded-xl px-3 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-sky-500 before:transition-all ease-in before:duration-700 hover:text-white hover:before:w-full"
  //                         >
  //                           <span className="flex relative z-10">
  //                           <IoIosSettings 
  //                             className={ isClick?`rotate-90 text-cyan-500 transition-all ease-in` : ` rotate-180 transition-all ease-in`} size={35} />
  //                           </span>
  //                         </button>
  //                       </div>
  //   )
  // }

  
  return (
    <header  className = { isOpen?` p-3 transition-all duration-500 ease-in-out bg-slate-900   sticky top-0 z-10  ` : 
                                  `transition-all duration-500 ease-in-out h-20 flex items-center md:bg-slate-100 text-white md:text-black bg-slate-900 sticky top-0 z-10`}>

        <div className={isOpen ? ` min-h-96 transition-all ease-in-out duration-300  container mx-auto flex  p-3 flex-col  md:flex-row justify-around items-center md:justify-start` :
                                 ` h-24 transition-all ease-in-out duration-200  container mx-auto flex  p-3 flex-col  md:flex-row justify-between items-center md:justify-start`}>
                
        <div className='flex flex-row w-full md:w-auto justify-between items-center m-2 md:p-0'>
                
                  <Image
                  alt="italian garden logo"
                  className="w-12 h-12"
                  src='/assets/pizzaSlice.webp'
                  width={50}
                  height={50}
                  /> 
                
                <p className="title-font font-medium md:mb-0">
                  <Link href="#home" className="ml-3 text-md sm:text-3xl font-semibold">
                     Italian Pizza Sydney
                  </Link>
                </p>
                
                <button className= {isOpen? `ml-20 flex rotate-180 md:hidden text-sky-500 transition-all ease-in duration-200`:`ml-20 hover:bg-sky-900 p-2 rounded-full rotate-0 flex md:hidden text-white transition-all ease-in `  }
                        onClick={()=>(setIsOpen(!isOpen) ,setIsClick(false))}
                >
                { isOpen ? <IoMdClose size={30} /> :   <FaBars size={25} />}  
                </button>

                
        </div>
        <nav onClick={()=>setIsOpen(false)} className={isOpen? ` gap-2  w-full md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-600	flex  flex-col md:flex-row items-start text-base justify-start  ` :
                                 ` hidden  md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-600	md:flex  items-center text-base justify-center`}>
          <Link  href="#home" className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
              Home
          </Link>
           <Link href="#packages"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
             Package
           </Link>
           <Link href="#menu"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
            Menu
           </Link>
           {/* <Link href="#services"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
             Service
           </Link> */}
           <Link href="#gallery"className="mr-5 transition-all ease-in hover:text-red-500 hover:font-extrabold hover:text-lg">
             Gallery
           </Link>
                 
        </nav>
         
              
         


        {/* <div className={` w-full  md:w-auto p-3  flex  md:justify-end  ` } >
           <div className = {isClick? ` p-2 transition-all ease-in duration-200  h-32 md:h-12 md:w-96 flex flex-col md:flex-row items-start md:items-center justify-center `:
                                      ` h-4 transition-all ease-in duration-200 flex md:flex-row`}>
                       
                        { isOpen? menuSettings():null}
                        {isClick? 
                          <div className={   `w-full flex flex-col md:flex-row items-start  md:m-2 md:gap-1`}>
                          <div className='p-3 text-lg flex md:flex-row items-center  gap-1'>
                          <p >Dark Mode : </p>
                          <Switches checked={isDarkMode} handle={()=>handleDarkMode()}  />
                          </div>
                          <div className='text-xl p-3 flex md:flex-row items-center gap-1'>
                          <Image className='w-5 rounded-full' src={itaFlag} alt='Ita-Flag'/>
                          <Switches checked={isLangSwitch} handle={()=>handleLangSwitch()} />
                          <Image className='w-5 rounded-full' src={engFlag} alt='UK-flag'/>
                        </div>          
                      </div> : null }
           </div>
           
        </div> */}
         {/* {size > 770 ?
          <div  className={` 'text-black'}
           `}>
              <span className="relative z-10">{ isMenu? menuSettings():null}</span>
          </div> 
           : null }  */}
        <Link
          onClick={()=>setIsOpen(false)}
          href="#contact"
          className= {isOpen? `md:inline-flex items-center text-white  bg-gray-700 border-0 py-1 px-3 transition-all ease-in focus:outline-none hover:bg-red-700 rounded text-base mt-4 md:mt-0` 
                    :  ` hidden md:inline-flex items-center ml-5 border-rose-500 border py-1 px-3 transition-all ease-in focus:outline-none hover:bg-red-700 rounded text-lg text-amber mt-4 md:mt-0 hover:text-white ` }>
          Contact
        </Link>          

        </div>
        
      
    </header>
  )
}

export default Navbar
