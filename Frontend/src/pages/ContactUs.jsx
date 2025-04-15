import React from 'react'
import contacti from '../assets/contacti.svg'



const ContactUs = () => {
  return (
    <form className='mb-16'>
      <div className='flex min-h-screen items-center gap-5'>
        <img src={contacti} alt="err" className='h-2/3' />
        <div className='mb-10 flex-col flex items-start w-2/6 shadow-lg h-2/3 font-semibold' > 
          <h1 className='ml-10 font-semibold text-3xl'>Contact Form</h1>
          <div className='flex-col flex gap-4 ml-11 mt-8 w-3/5 py-8'>

            <p>Enter Your Name </p>
            <input className='border-2 border-primary' type='text'></input>
            <p>Enter Your E-mail</p>
            <input className='border-2 border-primary' type='email' ></input>
            <p>Enter your Phone number</p>
            <input className='border-2 border-primary' type='text'></input>
            <p>Enter your Message</p>
            <textarea className='border-2 border-primary' type='text'></textarea>
            <button className='bg-primary m-auto px-4 py-2 rounded-xl'> Submit </button> </div>
        </div>
      </div>
    </form>



  )
}

export default ContactUs