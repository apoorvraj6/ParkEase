import mongoose from "mongoose";




const parkinglotSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
    },
    coordinates:{
        lat:{type:Number,required:true},
        lng:{type:Number,required:true}
    },
    totalSlots:{
        type:Number,
        required:true,
    },
    availableSlots:{
        type:Number,
        required:true,
    },
    hourlyRate:{
        type:Number,
        required:true,
    },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Manager",
        default:null
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const ParkingLotModel = mongoose.models.parkinglot || mongoose.model('ParkingLot',parkinglotSchema)
export default ParkingLotModel;