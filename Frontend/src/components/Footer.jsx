import React from 'react'

const Footer = () => {
    return (
        <div className='flex justify-between bg-black -mx-4 px-5 py-10 mt-8 '>
            <div className='ml-5'>
                <h1 className='text-primary'>Company</h1>
                <div className='flex-col flex gap-2'>
                    <p className='text-white'>About us</p>
                    <p className='text-white'>Privacy Policy</p>
                    <p className='text-white'>Terms and Condition</p>
                    <p className='text-white'>Affilate Program</p>
                </div>

            </div>
            <div>
                <h1 className='text-primary'>Get Help</h1>
                <div className='flex-col flex gap-2'>
                    <p className='text-white'>FaQ</p>
                    <p className='text-white'>Contact us</p>
                    <p className='text-white'>7480046248</p>
                </div>
            </div>
            <div className='mr-5 ' >
                <h1 className='text-primary'>Services </h1>
                <div className='flex-col flex gap-2'>
                    <p className='text-white'> Parking System </p>
                    <p className='text-white'>Booking</p>
                    <p className='text-white'>Nearest Available Slot</p>
                    <p className='text-white'>Easy Check in and Checkout</p>
                    <p className='text-white'>No human Interaction </p>
                </div>
            </div>
        </div>
    )
}

export default Footer