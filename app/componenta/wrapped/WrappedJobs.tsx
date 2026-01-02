import Image from 'next/image'
import React from 'react'


function WrappedJobs({jobs}:any) {
  return (
    <>
        <section id="service" className="text-gray-400 bg-emerald-300 body-font ">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-6 text-emerald-900">
          {/* <CodeIcon className="mx-auto inline-block w-10 mb-4" /> */}
          <h1 className=" text-5xl font-medium title-font mb-4 ">
             <strong>Services</strong>
          </h1>
          <p className=" w-full mx-auto leading-relaxed text-xl md:text-2xl text-left t ">
          Personalized Service! Every project is unique, and we strive to offer tailor-made solutions that fully meet your expectations.
          Experience and Professionalism! Our team consists of qualified gardeners with years of experience in the field.
          </p>
        </div>
        
      </div>
      <div className="  flex flex-col md:flex-row md:flex-wrap items-center m-4  justify-center ">
          {jobs.map((job:any,indx:number) => {
          
           return ( 
           <div key={indx} className=" bg-emerald-50  m-4 md:w-[26rem] rounded-xl w-full md:h-[50rem] mb-10 ">             
              <div className="flex flex-col justify-center  items-center  gap-4 relative z-0">
                <Image
                  alt=""
                  className=" h-[18rem] w-[18rem] md:h-[20rem] md:w-[20rem] rounded-full mt-10 "
                  src={job.image}
                  width={500}
                  height={500}
                />
                {/* <p className='w-full h-5  text-slate-500 flex p-4 ml-16 justify-start'>SERVICE</p> */}

                
                <div className=" flex flex-col  items-start relative z-10 w-full p-4   ">
                  <h2 className="tracking-wider text-left text-3xl md:text-4xl lg:text-5xl title-font font-bold text-emerald-800 p-2 pt-4">
                    {job.title}
                  </h2>
                  {/* <h1 className="title-font text-lg font-medium text-slate-400 mb-3">
                    {job.subtitle}
                  </h1> */}
                  <p className="leading-relaxed text-left text-lg  text-zinc-800 font-medium p-2">{job.description}</p>
                </div>
              </div>
            </div>)
        })}
        </div>
    </section>      
    </>
  )
}

export default WrappedJobs
