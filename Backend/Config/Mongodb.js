import mongoose from "mongoose";


const connectdb = async()=>{
    mongoose.connection.on('connected',()=>{console.log('Mongodb Connected')})
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}


export default connectdb;