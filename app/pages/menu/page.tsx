import React from 'react'
import WrappedMenu from '@/app/componenta/wrapped/WrappedMenu'
import Navbar from '@/app/componenta/Navbar'
import { SkillsResponse } from '../../types/dataTypes';


const getMenu = async (): Promise<SkillsResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/menu",{ next: { revalidate: 36 } });
  return await response.json();
};

async function page() {
  const menu = await getMenu()
  return (
    <div className=' bg-stone-900 text-stone-300'>
        <WrappedMenu menuProp={menu} />      
    </div>
  )
}

export default page
