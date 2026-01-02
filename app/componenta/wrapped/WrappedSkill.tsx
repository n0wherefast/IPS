import React from 'react'
import { SlBadge } from "react-icons/sl";
import Image from 'next/image';

function WrappedSkill({skills}:any) {
  return (
    <>
      <section id="skills">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-5xl text-3xl font-medium title-font text-white mb-4">
            <strong>Environmental Sustainability </strong>
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            We promote eco-friendly gardening practices, reducing the use of chemical pesticides and adopting green solutions.
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {skills.map((skill:any,indx:number) => (
              <div key={indx} className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-800 rounded flex p-4 h-full items-center">
                  <SlBadge className="text-green-400 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium text-white">
                    {skill.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>  
   
    </>
  )
}

export default WrappedSkill
