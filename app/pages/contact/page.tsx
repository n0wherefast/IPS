import React from 'react'
import WrappedForm from '../../componenta/wrapped/WrappedForm';
import { FormRespsonse } from '../../types/dataTypes';
import IframeGTM from '../../GoogleTagManager/IframeGTM';

const getForm = async ():Promise<FormRespsonse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
  const res = await fetch(apiUrl+"/api/form",{next:{revalidate:36}})
  return  await res.json()
}
  
async function Contact() {
  const form = await getForm()
  return (
    <>
      {/* <IframeGTM /> */}
      <WrappedForm formData = {form} /> 
    </>
  )
}

export default Contact 
