import React from "react";

const About = () => {
  return (
    <div
      className="  h-auto mb-8  opacity-80 p-6 rounded-lg"
      style={{ backgroundImage: "url('/zoom.svg')" }} >
      <div className="flex-col flex  ">
        <h1 className="flex justify-center text-blue-50 text-5xl font-extrabold gap-4" > About Us </h1>
        <div className="flex-col flex  gap-8 m-20 font-semibold">
          <p className="flex justify-center text-xl  text-black" > Finding a parking spot in busy urban areas can be frustrating and time-consuming. Our Smart Parking System is designed to make parking effortless, efficient, and stress-free. Using real-time tracking, automated reservations, and AI-powered space allocation, our platform helps drivers locate and book available parking spots instantly.</p>
          <p className="flex justify-center text-xl  text-black" >With our user-friendly interface, you can check parking availability, reserve a spot in advance, and make seamless digital payments—all from your smartphone. Our system also reduces traffic congestion and carbon emissions by minimizing the time spent searching for parking.</p>
          <p className="flex justify-center text-xl text-black">Whether you're a daily commuter, a business owner, a city planner, or a traveler, our Smart Parking System ensures a smarter, safer, more efficient, and environmentally sustainable parking experience for everyone. </p>

        </div>
      </div>
    </div>
  );
};

export default About;