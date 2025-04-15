import express from 'express'
import { addBooking, cancelBooking, checkIn, checkOut, getUserBooking, getUserProfile, loginUser, registerUser, updateUserProfile,allParkingLots } from '../Controllers/User.js';
import authUser from '../Middlewares/AuthUser.js';



const userRouter = express.Router();


userRouter.post('/register-user',registerUser)
userRouter.post('/login-user',loginUser)
userRouter.post('/add-booking',authUser,addBooking);
userRouter.get('/get-booking',authUser,getUserBooking);
userRouter.post('/cancel-booking',authUser,cancelBooking);
userRouter.post('/check-in',authUser,checkIn);
userRouter.post('/check-out',authUser,checkOut);
userRouter.get('/user-profile',authUser,getUserProfile);
userRouter.put('/update-profile',authUser,updateUserProfile);
userRouter.get('/parkingLots',authUser,allParkingLots)


export default userRouter;



