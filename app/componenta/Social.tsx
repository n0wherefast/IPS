import React from 'react'
import Link from 'next/link'
import { SlSocialInstagram ,SlSocialFacebook} from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";

function Social() {
  return (
     <div className='grid grid-cols-3 gap-5'>
                    <Link aria-label='facebook' className=' text-2xl hover:text-blue-500 transition-all' href={'https://www.facebook.com/profile.php?id=100088427027910'}>
                    <SlSocialFacebook/>
                    </Link>
                    <Link aria-label='instagram' className='text-2xl hover:text-rose-500 transition-all' href={'https://www.instagram.com/italianpizzasyd?igsh=NmxsOGVmeWQ2dXVv'}>
                    <SlSocialInstagram/> 
                    </Link> 
                
                    <Link aria-label='whatsapp' className='text-2xl hover:text-emerald-500 transition-all' href={'https://wa.me/message/QTAGOJDBVW3FI1'}>
                      <FaWhatsapp/>
                    </Link>
            </div>
  )
}

export default Social
