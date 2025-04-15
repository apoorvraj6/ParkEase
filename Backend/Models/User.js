import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    phone:{
        type:String,
        default:"0000000000"
    },
    booking:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const userModel = mongoose.models.user || mongoose.model('User',userSchema)

export default userModel;
