import React from 'react'
import Navbar from "./components/Navbar.jsx"
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ContactUs from './pages/ContactUs.jsx'
import {ToastContainer} from 'react-toastify'
import Footer from './components/Footer.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Booking from './pages/Booking.jsx'
import BookSlot from './pages/BookSlot.jsx'


const App = () => {
  return (
    <div className='mx-4 sm-mx-[10%]'>
      <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/services' element={<Services/>}></Route>
      <Route path='/contact-us' element={<ContactUs/>}></Route>
      <Route path='/my-profile' element={<MyProfile/>}></Route>
      <Route path='/my-bookings' element={<Booking/>}></Route>
      <Route path='/booking' element={<BookSlot/>}></Route>
    </Routes>
    <Footer/>
    </div>
    
  )
}

export default App