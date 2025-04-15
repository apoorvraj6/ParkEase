import React from 'react';
import home from '../assets/home.jpg';

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen p-5 md:p-10'>
      {/* Text Section */}
      <div className='text-center md:text-left md:ml-10 md:mt-20 space-y-5'>
        <p className='text-4xl md:text-8xl font-bold text-[#1A2E35]'>Welcome <span className='text-primary'>Back</span></p>
        <p className='text-gray-600 text-lg md:text-xl'>
        ParkEase – Effortless Parking, Smart Booking, and Stress-Free Travel!
        </p>
      </div>

      {/* Image Section */}
      <img className='w-full max-w-[400px] md:max-w-[800px] h-auto' src={home} alt='Home' />
    </div>
  );
};

export default Home;
