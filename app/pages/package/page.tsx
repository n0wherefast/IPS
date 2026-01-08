import WrappedPackage from '@/app/componenta/wrapped/WrappedPackage'
import React from 'react'

const getPackage = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/package",{ next: { revalidate: 36 } });
  return await response.json();
};


async function page() {
 const pack = await getPackage()
  return (
    <div className=' bg-stone-900 text-stone-300'>
      <WrappedPackage packProps = {pack} />
    </div>
  )
}

export default page
