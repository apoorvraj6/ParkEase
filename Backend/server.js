import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './Config/Mongodb.js';
import userRouter from './Routes/User.js';
import adminRouter from './Routes/Admin.js';



const app = express();
const port = 4000;
connectdb();

//middleware
app.use(cors())
app.use(express.json())

// api
app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)



app.listen(port,()=>{
    console.log('Server Started',4000);
})
