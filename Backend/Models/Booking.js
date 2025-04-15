import mongoose from "mongoose";



const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    parkingLot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ParkingLot",
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now
    },
    startTime:{
        type:Date,
        required:true,
    },
    endTime:{
        type:Date,
        required:true,
    },
    duration:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    },
    qrCode:{
        type:String,
        default:null,
    },
    status:{
        type:String,
        enum:["Completed","Active","Pending"],
        default:"Pending"
    },
    checkInTime:{
        type:Date,
    },
    checkOutTime:{
        type:Date,
    },
    extraCharge:{
        type:Number,
        default:0
    }

})

const bookingModel = mongoose.models.bookingSchema || mongoose.model("Booking",bookingSchema)

export default bookingModel