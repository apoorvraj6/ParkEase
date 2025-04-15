import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../Models/User.js';
import ParkingLotModel from '../Models/ParkingLot.js';
import bookingModel from '../Models/Booking.js';
import QRCode from 'qrcode';



const registerUser = async(req,res) =>{
    try {
        const {name,email,password} = req.body;
    
        if(!name)
            res.json({success:false,message:"Enter the name"})
    
        if(!email)
            res.json({success:false,message:"Enter the email"})
    
        if(!password)
            res.json({success:false,message:"Enter the password"})
    
        if(!validator.isEmail(email))
            return res.json({success:false,message:"Enter a valid email id"})
    
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(password,salt);
    
        const userData = {
            name,
            email,
            password:hashedPasword
        }
    
        const newUser = new userModel(userData);
        const user = await newUser.save();
    
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.json({success:true,message:"User Registered" , token,salt,hashedPasword});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
    }
}

const loginUser = async(req,res)=>{

   try {
     const {email,password} = req.body
 
     if(!email)
         return res.json({success:false,message:"Enter a Email id"})
     if(!password)
         return res.json({success:false,message:"Enter the password"})

     if(!validator.isEmail(email))
        return res.json({success:false,message:"Enter a valid Email id"})

     const user = await userModel.findOne({email});

     if(!user)
        return res.json({success:false,message:"User Not Found"})

    const isMatch = await bcrypt.compare(password,user.password);

    if(isMatch)
    {
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,message:"User Logged In",token});
    }
    else{
        res.json({success:false,message:"Incorrect Password"});
    }


   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message});
   }
    
}

const allParkingLots = async(req,res)=>{
    try {
        const parkingLots = await ParkingLotModel.find({})
        res.json({success:true,parkingLots})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

const addBooking = async(req,res)=>{

   try {
     const {userId,parkingLotId,startTime,endTime} = req.body;
     
     if(!startTime)
         return res.json({success:false,message:"Enter the startTime"})
     
     if(!endTime)
         return res.json({success:false,message:"Enter the startTime"})
 
     if(!parkingLotId)
         return res.json({success:false,message:"Parking Lot Not Found"})
 
     const parkingLot = await ParkingLotModel.findById(parkingLotId)
 
     if(!parkingLot)
         return res.json({success:false,message:"Parking Lot Not Found"})
 
     if(parkingLot.availableSlots <=0)
         return res.json({success:false,message:"All Slots Are Occupied"})
 
     const duration = (new Date(endTime) - new Date(startTime))/(1000 * 60 *60)
     
     if(duration <=0)
         return res.json({success:false,message:"Book Atleast for 1 hour"})
 
     const totalAmount = duration * parkingLot.hourlyRate;

     
 
     const bookingData = {
         user:userId,
         parkingLot:parkingLotId,
         startTime,
         endTime,
         duration,
         totalAmount,
     }
 
     const newBooking = new bookingModel(bookingData);
     const booking = await newBooking.save();

     const qrCodeData = `Booking Id :${booking._id}`;
     const qrImage = await QRCode.toDataURL(qrCodeData);

     await bookingModel.findByIdAndUpdate(booking._id,{qrCode:qrImage})

 
     parkingLot.availableSlots = parkingLot.availableSlots -1;
     await parkingLot.save();

    
 
     res.json({success:true,message:"Slot Booked",booking,qrcode:qrImage});
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message});
   }
}

const getUserBooking = async(req,res)=>{

    try {
        const {userId} = req.body;
        
    
        const booking  = await bookingModel.find({user:userId}).populate("parkingLot","name location hourlyRate coordinates")
        .sort({startTime:-1});
        
    
        res.json({success:true,booking})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}); 
    }
 }

 const cancelBooking = async(req,res)=>{
    try {
        const {userId,bookingId} = req.body;
       

        const booking = await bookingModel.findById(bookingId);
        
        if(!booking)
            return res.json({success:false,message:"Booking not Found"})

        if(userId !== booking.user.toString())
            return res.json({success:false,message:"Unauthorised Access"})

        if(booking.status === "Completed" || booking.status ==="Active")
            return res.json({success:false,message:"Booking Already Completed"})

        await booking.deleteOne()

        const parkingLot = await ParkingLotModel.findByIdAndUpdate(booking.parkingLot,{$inc:{availableSlots:1}})

        res.json({success:true,message:"Booking Cancelled",parkingLot});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}); 
    }
 }

 const checkIn = async(req,res)=>{
    try {
        const {bookingId,scannedQrCode} = req.body
    
        const booking = await bookingModel.findById(bookingId)
    
        if(booking.status === 'Active')
            return res.json({success:false,message:"Already checkedIn"})

        if (booking.qrCode !== scannedQrCode) {
            return res.status(400).json({ success: false, message: "Invalid QR Code" });
        }
    
        booking.checkInTime = new Date;
        booking.status = "Active"
        await booking.save();
    
        res.json({success:true,message:"User CheckedIn"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}); 
    }

 }

 const checkOut = async(req,res)=>{

    try {
        const {bookingId,scannedQrCode} = req.body
        
        const booking = await bookingModel.findById(bookingId)
    
        if (!booking.checkInTime) {
            return res.json({ success: false, message: "User has not checked in" });
        }
    
        if(booking.checkOutTime)
            return res.json({success:false,message:"Already checked Out"})
    
        if (booking.qrCode !== scannedQrCode) {
            return res.json({ success: false, message: "Invalid QR Code" });
        }
    
        booking.checkOutTime = new Date();
    
        
        const actualDuration = (booking.checkOutTime - booking.checkInTime) / (1000 * 60 * 60);
    
        
        const extraHours = Math.max(0, actualDuration - booking.duration);
        const extraCharges = extraHours * booking.parkingLot.hourlyRate;
    
        
        booking.status = "Completed";
        booking.extraCharges = extraCharges;
        booking.qrCode = null;
        await booking.save();
    
        res.json({ 
            success: true, 
            message: "Check-out successful", 
            totalTime: actualDuration, 
            bookedTime:booking.duration,
            extraCharges,
            qrCode:booking.qrCode
        });
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}); 
    }

 }
 
 const getUserProfile = async(req,res)=>{
    try {
        const {userId} = req.body;
    
        const user = await userModel.findById(userId).select("-password");
    
        if(!user)
            return res.json({success:false,message:"User Not Found"})
    
        res.json({success:true,user});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}); 
    }

 }

 const updateUserProfile = async(req,res)=>{
    try {
        const newData = req.body;
        const {userId }= req.body;

        const newUser = await userModel.findByIdAndUpdate(userId,newData,{
            new:true,
            runValidators: true,
        })

       

        res.json({success:true,message:"User Updated",user:newUser})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message});
    }
 }

 







export {
    registerUser,
    loginUser,
    addBooking,
    getUserBooking,
    cancelBooking,
    checkIn,
    checkOut,
    getUserProfile,
    updateUserProfile,
    allParkingLots
}

