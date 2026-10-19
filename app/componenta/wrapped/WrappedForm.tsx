'use client'
import { FormRespsonse, VALUE, VAL } from '@/app/types/dataTypes'
import React, {useState, useRef, useEffect} from 'react'
import Swal from 'sweetalert2'
import { validationSchema } from '../../validation/validation'
import Terms from './Terms'

type FormField = {
  id: string
  name: string
  type: string
  min?: number
  max?: number
}

type WrappedFormProps = {
  formData?: FormRespsonse
}

const formFields: FormField[] = [
  { id: 'name', name: 'name', type: 'text' },
  { id: 'email', name: 'email', type: 'email' },
  { id: 'phone', name: 'phone', type: 'tel' },
  { id: 'date', name: 'date', type: 'date' },
  { id: 'time', name: 'time', type: 'time' },
  { id: 'address', name: 'address', type: 'text' },
  { id: 'numberOfAdults', name: 'numberOfAdults', type: 'number', min: 1 },
  { id: 'numberOfKidsUnder10', name: 'numberOfKidsUnder10', type: 'number', min: 0 }
]

const WrappedForm: React.FC<WrappedFormProps> = ({ formData }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [messagePrefill, setMessagePrefill] = useState('')
  const [packPrefill, setPackPrefill] = useState('')

  useEffect(() => {
    if (formData?.name) {
      setMessagePrefill((prev) => prev || formData.name)
    }
  }, [formData])

  useEffect(()=>{
    try{
      if(formRef.current) formRef.current.reset()

      const saved = localStorage.getItem('kitchen_cart_message')
      if(saved){
        setMessagePrefill(saved)
        localStorage.removeItem('kitchen_cart_message')
        // also cleanup any remaining kitchen_ keys to avoid double-appending
        try{
          Object.keys(localStorage).forEach((k)=>{
            if(typeof k === 'string' && k.startsWith('kitchen_')){
              localStorage.removeItem(k)
            }
          })
        }catch(err){}
        return
      }

      const packSaved = localStorage.getItem('kitchen_cart_pack')
      if(packSaved){
        setPackPrefill(packSaved)
        localStorage.removeItem('kitchen_cart_pack')
      } else {
        if (typeof window !== 'undefined') {
          try{
            const params = new URLSearchParams(window.location.search)
            const q = params.get('pack')
            if(q) setPackPrefill(q)
          }catch(e){}
        }
      }

      const raw = localStorage.getItem('kitchen_cart')
      if(raw){
        const items = JSON.parse(raw)
        if(Array.isArray(items) && items.length){
          let total = 0
          const lines = items.map((it:any)=>{
            const unit = Number(it.price) || 0
            const qty = Number(it.qty) || 1
            const lineTotal = unit * qty
            total += lineTotal
            return `${qty} x ${it.name} @ $${unit.toFixed(2)} = $${lineTotal.toFixed(2)}`
          })

          const summaryLines = [
            '--- Catering Cart Summary ---',
            'Items:',
            ...lines.map(l => `• ${l}`),
            `Subtotal: $${total.toFixed(2)}`,
            '',
            'Please include the cart above in my enquiry. Thank you.'
          ]

          setMessagePrefill(prev => prev ? prev + '\n\n' + summaryLines.join('\n') : summaryLines.join('\n'))

          // cleanup kitchen-related localStorage now that we've captured the message
          try{
            if(typeof window !== 'undefined' && window.localStorage){
              Object.keys(localStorage).forEach((k)=>{
                if(typeof k === 'string' && k.startsWith('kitchen_')){
                  localStorage.removeItem(k)
                }
              })
            }
          }catch(err){ /* ignore */ }
        }
      }
    }catch(e){ }
  },[])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!formRef.current) return

    const fd = new FormData(formRef.current)
    const formData: any = {
      name: fd.get('name')?.toString() || '',
      date: fd.get('date')?.toString() || '',
      email: fd.get('email')?.toString() || '',
      message: fd.get('message')?.toString() || messagePrefill || '',
      phone: fd.get('phone')?.toString() || '',
      time: fd.get('time')?.toString() || '',
      address: fd.get('address')?.toString() || '',
      pack: fd.get('pack')?.toString() || packPrefill || '',
      terms: fd.get('terms') === 'on' || fd.get('terms') === 'true' || Boolean(fd.get('terms')),
      numberOfAdults: Number(fd.get('numberOfAdults')?.toString() || 0),
      numberOfKidsUnder10: Number(fd.get('numberOfKidsUnder10')?.toString() || 0)
    }

    const valid = await validationSchema.isValid(formData)
    if(!valid){
      Swal.fire({ icon: 'error', title: 'Invalid', text: 'Please complete the form correctly.' })
      return
    }

    const webkey = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY || process.env.NEXT_PUBLIC_WEB || '') as string

    if (!webkey) {
      Swal.fire({
        icon: 'error',
        title: 'Form not configured',
        text: 'Missing Web3Forms access key. Add NEXT_PUBLIC_WEB3FORMS_KEY or NEXT_PUBLIC_WEB in the environment.'
      })
      return
    }

    try{
      const response = await fetch('https://api.web3forms.com/submit', {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: webkey, ...formData })
      })

      const result = await response.json()
      if(result.success){
        formRef.current.reset()
        setMessagePrefill('')
        localStorage.removeItem('kitchen_cart')
        localStorage.removeItem('kitchen_cart_pack')
        Swal.fire({ title: 'Good job!', text: 'Your message has been sent successfully!', icon: 'success' })
      } else {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Something went wrong!' })
        console.error(result.error)
      }
    }catch(err){
      Swal.fire({ icon: 'error', title: 'Network error', text: 'Could not send your message.' })
      console.error(err)
    }
  }

  return (
    <>
     <section  className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl">Request a quote</h2>
          <p className="mt-2 text-stone-700">Tell us about your event—date, location, number of guests, dietary needs—and we will get back to you quickly.</p>
          <form ref={formRef} onSubmit={onSubmit} autoComplete="off" className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields.map((f,key) => (
              <label key={key} className="grid gap-1 text-sm">
                 <input
                        type={f.type}
                        id={f.id}
                        placeholder={f.id}
                        name={f.name}
                        min={f.min}
                        max={f.max}
                        required
                        autoComplete="off"
                        className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
                      />
              </label>
            ))}
            <label className="sm:col-span-2 grid gap-1 text-sm">
              <span>Message</span>
              <textarea name="message" rows={6} value={messagePrefill} onChange={(e)=>setMessagePrefill(e.target.value)} className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"/>
            </label>
             <div className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500">
              <label htmlFor="pack">Select package</label>
                <select className='' name='pack' id='pack' required value={packPrefill} onChange={(e)=>setPackPrefill(e.target.value)}>
                  <option value="">---</option>
                  <option value="packA">pack A</option>
                  <option value="packB">pack B</option>
                  <option value="packC">pack C</option>
                  <option value="packD">pack D</option>
                  <option value="kitchenMenu">kitchen menu</option>
                  <option value="specialPack">special pack</option>
                </select>
          </div>
          <div className="rounded-xl flex gap-4 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500">
            <label htmlFor="termsAndCondition">I Read Terms and Condition</label>
            <input id='terms' name="terms" type="checkbox" required />
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

export default WrappedForm
