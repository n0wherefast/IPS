import React from 'react'
import WrappedAbout from './wrapped/WrappedAbout'
export const dynamic = 'force-dynamic'

import { SkillsResponse } from '../types/dataTypes';

const getAbout = async (): Promise<SkillsResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/about",{ next: { revalidate: 36 } });
  return await response.json();
};

async function About() {
    const about = await getAbout()
  return (
    <div>
      <WrappedAbout aboutProp={about} />
    </div>
  )
}

export default About
