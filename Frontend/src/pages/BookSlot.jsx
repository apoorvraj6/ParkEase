import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const BookSlot = () => {
  const location = useLocation()
  const lot = location.state.lot
  const navigate = useNavigate();

  const { currency,backendUrl,token } = useContext(AppContext)

  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const [startInput, setStartInput] = useState('')
  const [startPeriod, setStartPeriod] = useState('AM')

  const [endInput, setEndInput] = useState('')
  const [endPeriod, setEndPeriod] = useState('AM')

  

  // Converts 12-hour format to ISO format before storing in state
  const convertToISO = (time, period) => {
    if (!time) return null

    const [hours, minutes] = time.split(':').map(Number)
    let adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours
    adjustedHours = period === 'AM' && hours === 12 ? 0 : adjustedHours

    const now = new Date()
    now.setHours(adjustedHours, minutes, 0, 0)
    return now.toISOString()
  }

  // Handle Start Time Change
  const handleStartTimeChange = (time, period) => {
    setStartInput(time)
    setStartPeriod(period)

    const isoTime = convertToISO(time, period)
    setStartTime(isoTime) // Store ISO time in state
  }

  // Handle End Time Change
  const handleEndTimeChange = (time, period) => {
    const isoStart = startTime
    const isoEnd = convertToISO(time, period)

    if (isoStart > isoEnd) {
      setEndInput(time)
      setEndPeriod(period)
      setEndTime(isoEnd) 
    } else {
      toast.error("End Time must be atleast 1 hour after the start time")
    }
  }

  const addBooking = async()=>{
    try {
      const id = lot._id;
      const {data} = await axios.post(backendUrl+'/api/user/add-booking',{parkingLotId:id,startTime,endTime},{headers:{token}});

      if(data.success){
        toast.success("Slot Booked")
        navigate('/');
      }
      else{
        console.log(data.message)
        toast.error(data.message)
      }
        
    } catch (error) {
      console.log(error.message)
        toast.error(error.message)
    }
  }

  useEffect(()=>{
    console.log(lot)
  },[lot])

 

  return (
    <div className='my-3 mx-5 flex flex-col items-center gap-20 md:flex-row '>
      <MapContainer center={[lot.coordinates.lat, lot.coordinates.lng]} zoom={15} className="h-80 w-full md:w-1/2 ">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lot.coordinates.lat, lot.coordinates.lng]}></Marker>
      </MapContainer>

      <div className='flex flex-col justify-center items-start gap-2'>
        <h1 className='text-3xl font-semibold text-primary md:text-6xl'> {lot.name}</h1>
        <p className='font-normal'> {lot.location}</p>
        <p>Available Slots: <span className='text-primary'>{lot.availableSlots}</span></p>
        <p>Price: <span className='text-primary'>{currency}{lot.hourlyRate}</span></p>

        {/* Start Time Input */}
        <label className="block mt-4 text-sm font-medium text-gray-700">Start Time:</label>
        <div className="flex gap-2">
          <input
            type="time"
            value={startInput}
            onChange={(e) => handleStartTimeChange(e.target.value, startPeriod)}
            className="border border-gray-300 rounded-md px-3 py-1 mt-1 w-full"
          />
          <select
            value={startPeriod}
            onChange={(e) => handleStartTimeChange(startInput, e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* End Time Input */}
        <label className="block mt-4 text-sm font-medium text-gray-700">End Time:</label>
        <div className="flex gap-2">
          <input
            type="time"
            value={endInput}
            onChange={(e) => handleEndTimeChange(e.target.value, endPeriod)}
            className="border border-gray-300 rounded-md px-3 py-1 mt-1 w-full"
          />
          <select
            value={endPeriod}
            onChange={(e) => handleEndTimeChange(endInput, e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 mt-1"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <button className='bg-primary px-3 py-2 text-lg font-semibold rounded-md md:self-center' onClick={addBooking}>Book Slot</button>
      </div>
      
    </div>
  )
}

export default BookSlot
