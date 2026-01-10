import React from 'react'
import WrappedReviews from './wrapped/WrappedReviews'
import type { JobsResponse } from '../types/dataTypes';
export const dynamic = 'force-dynamic';



const getReviews = async (): Promise<JobsResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    const response = await fetch( apiUrl+"/api/reviews" , { next: { revalidate: 36 } });
    return await response.json();
  };

async function Reviews() {
    const reviews = await getReviews()
  return (
    <div>
      <WrappedReviews reviews={reviews} />
    </div>
  )
}

export default Reviews
