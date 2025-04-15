import jwt from "jsonwebtoken";
import validator from 'validator'
import ParkingLotModel from "../Models/ParkingLot.js";
import bookingModel from "../Models/Booking.js";







const loginAdmin = async(req ,res) =>{

    try {
        const {email,password} = req.body;

        if(!email)
            return res.json({success:false,message:"Enter the Email Id"})

        if(!password)
            return res.json({success:false,message:"Enter the Password"})

        if(!validator.isEmail(email))
            return res.json({success:false,message:"Enter the valid Email id"})

        if(email !== process.env.ADMIN_EMAIL)
            return res.json({success:false,message:"Wrong Email id"})

        if(password !== process.env.ADMIN_PASSWORD)
            return res.json({success:false,message:"Wrong Password"})

        const token = jwt.sign(email+password,process.env.JWT_SECRET)

        res.json({success:true,message:"Admin Logged In",token})
    
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
    
}

const addParkingLot = async(req,res)=>{
    try {
        const {name,location,coordinates,totalSlots,availableSlots,hourlyRate,manager,isActive} = req.body

        if(!name || !location ||!totalSlots ||!coordinates ||!availableSlots ||!hourlyRate)
            return res.json({success:false,message:"Enter all the fields"})

        if(typeof coordinates.lat !== "number" || typeof coordinates.lng !== "number")
            return res.json({success:false,message:"Enter a valid lantitude or longitude"})

        const parkingData = {
            name,
            location,
            coordinates:{lat:coordinates.lat,lng:coordinates.lng},
            totalSlots,
            availableSlots:totalSlots,
            hourlyRate,
            manager:manager || null
        }

        const newParkingLot = await ParkingLotModel(parkingData)

        const parkingLot = await newParkingLot.save();
        res.json({success:true,parkingLot});
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}



const updateParkingLot = async(req,res)=>{
    try {
        const {id} = req.params;
        const newData = req.body;
    
        if(!id)
            return res.json({success:false,message:"Parking Lot Not Found"})
    
        const updateParkingLot = await ParkingLotModel.findByIdAndUpdate(id,newData,{
            new:true,
            runValidators:true
        })
    
        if(!updateParkingLot)
            return res.json({success:false,message:"Parking Lot not Found"})
    
        res.json({success:true,message:"Parking Lot updated",parkingLot:updateParkingLot})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }

}

const deleteParkingLot = async(req,res)=>{
    try {
        const {id} = req.params;
    
        if(!id)
            return res.json({success:false,message:"Parking Lot Not Found"})
    
        const deleteData = await ParkingLotModel.findByIdAndDelete(id)

        if(!deleteData)
            return res.json({success:false,message:"Error while deleting parkingLot"})
    
        res.json({success:true,message:"Parking Lot deleted",deleteData})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }
}

const getAllBookings = async(req,res)=>{

    try {
        const allBooking = await bookingModel.find({}).populate("user","name email phone").populate("parkingLot","name location hourlyRate")
    
        if(!allBooking)
            return res.json({success:false,message:"Error while getting details"})
    
        return res.json({success:true,allBooking});
    } catch (error) {
        console.log(error)
        res.json({success:false , message:error.message})
    }

}






export {loginAdmin,addParkingLot,updateParkingLot,deleteParkingLot,getAllBookings}