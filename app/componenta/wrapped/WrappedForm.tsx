'use client'
import { FormRespsonse, VALUE, VAL } from '@/app/types/dataTypes'
import React, {useState} from 'react'
import Swal from 'sweetalert2'
import { validationSchema } from '../../validation/validation'
import Terms from './Terms'

interface IForm{
  id:string;
  type:string;
  name:string;
  min?:string | any;
  max?:string | any;
}

const webkey = process.env.webKey

function WrappedFrom({formData}:any) {
  
   
    const onSubmit = async (e:any) => {
      e.preventDefault();
      let formData = {
        name: e.target.name.value,
        date: e.target.date.value,
        email: e.target.email.value,
        message: e.target.message.value,
        phone: e.target.phone.value,
        time: e.target.time.value,
        address: e.target.address.value,
        pack: e.target.pack.value,
        terms: e.target.terms.value,
        numberOfAdults: e.target.numberOfAdults.value,
        numberOfKidsUnder10: e.target.from6upto10years.value,
      }
  const response = await fetch("https://api.web3forms.com/submit", {
      mode : "cors",
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      }, 
      body: JSON.stringify({
          access_key: webkey,
         ...formData
      }),
  });
  
  const valid = await validationSchema.isValid(formData)
  console.log(valid);
  const result = await response.json();
  if (result.success) {
      e.target.reset()
      Swal.fire({
        title: "Good job!",
        text: "Your message has been sent successfully!",
        icon: "success"
      });
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    console.log(result.error)
  }

    };

  return (
    <>
     <section  className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl">Request a quote</h2>
          <p className="mt-2 text-stone-700">Tell us about your event—date, location, number of guests, dietary needs—and we will get back to you quickly.</p>
          <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.map((f:IForm,key:any) => (
              <label key={key} className="grid gap-1 text-sm">
                {/* <span>{f.label}</span> */}
                 <input  
                        type={f.type} 
                        id={f.id} 
                        placeholder={f.id} 
                        name={f.name} 
                        min={f.min}
                        max={f.max}
                        required
                        className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                      />
              </label>
            ))}
            <label className="sm:col-span-2 grid gap-1 text-sm">
              <span>Message</span>
              <textarea name="message" rows={4} className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"/>
            </label>
             <div className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500">
              <label htmlFor="pack">Select package</label>
                <select className='' name='pack' id='pack' required>
                  <option value="">---</option>
                  <option value="packA">pack A</option>
                  <option value="packB">pack B</option>
                  <option value="packC">pack C</option>
                  <option value="packD">pack D</option>
                  <option value="specialPack">special pack</option>
                </select>  
          </div>
          <div className="rounded-xl flex gap-4 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500">
            <label   htmlFor="termsAndCondition">I Read Terms and Condition</label>
            <input id='terms' name="termsAndCondition" type="checkbox" required />
          </div>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full sm:w-auto rounded-2xl bg-rose-600 px-6 py-3 text-white shadow hover:shadow-lg">Send enquiry</button>
            </div>
          </form>
        </div>
        <Terms/>
      </section>
    </>
  )
}

export default WrappedFrom
