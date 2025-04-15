import express from 'express'
import { addParkingLot, deleteParkingLot, getAllBookings, loginAdmin, updateParkingLot } from '../Controllers/Admin.js';
import authAdmin from '../Middlewares/AuthAdmin.js';




const adminRouter = express.Router();

adminRouter.get('/login-admin',loginAdmin)
adminRouter.post('/add-parkingLot',authAdmin,addParkingLot)

adminRouter.put('/update-parkingLot/:id',authAdmin,updateParkingLot)
adminRouter.delete('/delete-parkingLot/:id',authAdmin,deleteParkingLot)
adminRouter.get('/all-bookings',authAdmin,getAllBookings)

export default adminRouter