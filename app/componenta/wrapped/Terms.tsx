import React from 'react'

function Terms() {
  return (
    <div className="rounded-2xl bg-white border border-rose-500 my-3 py-4 px-4 shadow-sm">
        <h2 className="text-xl font-semibold" >Terms and conditions:</h2>
        <ul className="space-y-2 text-stone-700">
            <li className="mt-4 space-y-2 text-stone-700" >*We require 200$ deposit for secure bookings.</li>
            <li className="mt-4 space-y-2 text-stone-700" >*Deposit are not refundable </li>
            <li className="mt-4 space-y-2 text-stone-700" >*Menu selection and final guest numbers must be confirmed a week prior the event </li>
            <li className="mt-4 space-y-2 text-stone-700" >*Balance must be paid before the event starts</li>           
        </ul>
    </div>
  )
}

export default Terms
