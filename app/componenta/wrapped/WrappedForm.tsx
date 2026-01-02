'use client'
import { FormRespsonse, VALUE, VAL } from '@/app/types/dataTypes'
import React, {useState} from 'react'
import Swal from 'sweetalert2'



    const InitialValues = {name:"",email:"",message:""}

function WrappedFrom({formData}:any) {
    const [state,setState] = useState(InitialValues)

    const handleChange = (e:any,name:any) => {
       console.log(name, e.target.value)
       setState( (prev) => ({...prev,[name]:e.target.value} ))
    }


    const [result, setResult] = React.useState("");

    const onSubmit = async (event:any) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "b71f9d51-a458-4836-943d-d82a40f29a5c");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        Swal.fire({
          title: "Good job!",
          text: "Your message has been sent successfully!",
          icon: "success"
        });
  
        event.target.reset();
      } else {
        console.log("Error", data);Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        setResult(data.message);
      }
    };

  return (
    <>
       {/* <section id="contact" className="relative">
      <div className="container px-5 py-11 mx-auto flex sm:flex-nowrap flex-wrap ">
        <div className="lg:w-2/3 md:w-1/2 h-[35rem] md:h-auto   bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-center justify-center relative">
          <div className="bg-gray-800  relative flex flex-col gap-5 py-8 rounded shadow-md w-[35rem] ">
            <div className="lg:w-1/2 px-6 min-w-[10rem]  ">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">
                Greystanes,<br />
                 NSW, Australia, 2145
              </p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-indigo-400 leading-relaxed">
              italiangardensydney@gmail.com
              </a>
              <h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">+61 481 286 350</p>
            </div>
          </div>
        </div>

        <form
          name="contact"
          className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
          method='post'
          onSubmit={onSubmit}
          >
          <h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
            Contact Me
          </h2>
          <p className="leading-relaxed mb-5">
            Free Quotation available!
          </p>
          <div className="relative mb-4">
            {formData.map((field:FormRespsonse) =>{
                const {title,className,classNameLabel,type,id,name,htmlFor} = field
                return(
                    <div key={id}>
                     <label htmlFor={htmlFor} className={classNameLabel}>{title}</label>
                     <input type={type} className={className} id={id} name={name}  onChange={(e)=>handleChange(e,name)}/>
                    </div>
                 )
            })}            
          </div>

          <button
            type="submit"
            className="text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Contact Me Now!
          </button>
        </form>
      </div>
    </section>       */}
     <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl">Request a quote</h2>
          <p className="mt-2 text-stone-700">Tell us about your event—date, location, number of guests, dietary needs—and we will get back to you quickly.</p>
          <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              { name: "date", label: "Event date" },
              { name: "guests", label: "Guests" },
            ].map((f) => (
              <label key={f.name} className="grid gap-1 text-sm">
                <span>{f.label}</span>
                <input name={f.name} className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"/>
              </label>
            ))}
            <label className="sm:col-span-2 grid gap-1 text-sm">
              <span>Message</span>
              <textarea name="message" rows={4} className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"/>
            </label>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full sm:w-auto rounded-2xl bg-rose-600 px-6 py-3 text-white shadow hover:shadow-lg">Send enquiry</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default WrappedFrom
