import React from 'react'
export const dynamic = 'force-dynamic'

import { SkillsResponse } from '../types/dataTypes';
import WrappedSkill from './wrapped/WrappedSkill';

const getSkill = async (): Promise<SkillsResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
  const response = await fetch(apiUrl+"/api/skill",{ next: { revalidate: 36 } });
  return await response.json();
};

async function Skill() {
const skills = await getSkill()

  return (
    <>
     <WrappedSkill skills={skills}/>    
    </>
  )
}

export default Skill
