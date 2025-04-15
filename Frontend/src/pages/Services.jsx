import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { backendUrl, token,currency } = useContext(AppContext);
  const [parkingLots, setParkingLots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const navigator = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Unable to get location");
        }
      );
    }
  }, []);

  const getParkingLot = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/parkingLots`, { headers: { token } });
      if (data.success) {
        setParkingLots(data.parkingLots);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getParkingLot();
  }, [token]);

  const filteredParkingLots = parkingLots.filter((lot) =>
    lot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Parking Lots</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search parking lot by name..."
        className="w-full p-2 border border-gray-300 rounded-md mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Parking Slots Horizontal List */}
      <div className="overflow-x-auto flex flex-col gap-4">
        {filteredParkingLots.length > 0 ? (
          filteredParkingLots.map((lot) => (
            <div key={lot._id} className="p-4 border rounded-lg shadow-lg flex  min-w-[320px]">
              
              <MapContainer center={[lot.coordinates.lat, lot.coordinates.lng]} zoom={15} className="h-40 w-40">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lot.coordinates.lat, lot.coordinates.lng]}></Marker>
              </MapContainer>

              {/* Parking Info */}
              <div className="ml-4 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-xl font-semibold">{lot.name}</h3>
                  <p className="text-gray-600">Location: {lot.location}</p>
                  <p className="text-gray-700">Available Spots: {lot.availableSlots}</p>
                  <p className="text-gray-800 font-bold mt-2">Price: {currency}{lot.hourlyRate}/hr</p>
                </div>
                <div className="flex gap-2 mt-3 justify-center w-full">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>navigator('/booking',{state:{lot}})}>Book Now</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => setSelectedRoute(lot)}>View Route</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No parking lots found.</p>
        )}
      </div>

      {/* Route Map Modal */}
      {selectedRoute && userLocation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
              onClick={() => setSelectedRoute(null)}>
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-2">Route to {selectedRoute.name}</h3>
            <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} className="w-[300px] h-[300px]">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[userLocation.lat, userLocation.lng]}></Marker>
              <Marker position={[selectedRoute.coordinates.lat, selectedRoute.coordinates.lng]}></Marker>
              <Polyline positions={[[userLocation.lat, userLocation.lng], [selectedRoute.coordinates.lat, selectedRoute.coordinates.lng]]} color="blue" />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;