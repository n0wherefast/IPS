import Image from 'next/image'
import React from 'react'
import type { JobsResponse } from '../types/dataTypes';
import WrappedJobs from './wrapped/WrappedJobs';
export const dynamic = 'force-dynamic';

// export const revalidate = 36 ;  

const getJobs = async (): Promise<JobsResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    const response = await fetch( apiUrl+"/api/jobs" , { next: { revalidate: 36 } });
    return await response.json();
  };

async function Job() {
    const  jobs = await getJobs() 
    const {title, subtitle, description} = jobs
  return (
    <>
       <WrappedJobs jobs={jobs}/>
    </>
  )
}

export default Job
