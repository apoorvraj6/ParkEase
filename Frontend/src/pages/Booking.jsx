import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Booking = () => {
    const { backendUrl, token, currency } = useContext(AppContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showQr, setShowQr] = useState(null);

    const getBookingData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-booking`, { headers: { token } });
            if (data.success) {
                setBookings(data.booking);
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    useEffect(() => {
        if (token) getBookingData();
    }, [token]);

    useEffect(() => {
        console.log(bookings);
    }, [bookings]);

    if (loading) return <p className="text-center text-gray-500">Loading bookings...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Your Bookings</h2>
            {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    {bookings.map((booking) => (
                        <div key={booking._id} className='flex flex-col mb-10 md:gap-10 md:mb-6 md:flex-row shadow-xl md:justify-around'>
                            
                            
                            <MapContainer 
                                center={[booking.parkingLot.coordinates.lat, booking.parkingLot.coordinates.lng]} 
                                zoom={15} 
                                style={{ height: "200px", width: "300px" }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker 
                                    position={[booking.parkingLot.coordinates.lat, booking.parkingLot.coordinates.lng]} 
                                    icon={defaultIcon}
                                >
                                    <Popup>{booking.parkingLot.name}</Popup>
                                </Marker>
                            </MapContainer>

                            <div className='font-semibold'>
                                <h1 className='text-3xl font-semibold mb-5'>{booking.parkingLot.name}</h1>
                                <p>Start Time : <span className='text-[#3ba879]'>{formatDate(booking.startTime)}</span></p>
                                <p>End Time : <span className='text-[#3ba879]'>{formatDate(booking.endTime)}</span></p>
                                <p className='text-black'>Duration : <span className='text-[#3ba879]'>{booking.duration} hours</span></p>
                                <p>Total Amount : <span className='text-[#3ba879]'>{`${currency}${booking.totalAmount}`}</span></p>
                                <p>Status : <span className='text-[#3ba879]'>{booking.status}</span></p>
                            </div>

                            <div className='flex flex-col gap-4 mt-5 items-center'>
                                {booking.paymentStatus === "Pending" && booking.status !== 'Completed' ? 
                                    <button className='bg-primary w-2/6 md:w-full md:px-2 border-black border-2 rounded-md py-2'>Pay Now</button> 
                                    : 
                                    <button className='bg-primary w-2/6 md:w-full md:px-2 border-black border-2 rounded-md py-2'>Paid</button>
                                }
                                <button className='bg-primary w-2/6 border-black border-2 rounded-md py-2 md:w-full md:px-2' onClick={() => setShowQr(booking.qrCode)}> View Qr</button>
                            </div>

                        </div>
                    ))}

                    {showQr && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-4 rounded-lg shadow-lg text-center relative">
                                <button className="absolute top-2 right-2 text-red-500 font-bold text-lg" onClick={() => setShowQr(null)}>✖</button>
                                <h3 className="text-lg font-semibold mb-2">Your QR Code</h3>
                                <img src={showQr} alt="QR Code" className="w-48 h-48 mx-auto" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Booking;
