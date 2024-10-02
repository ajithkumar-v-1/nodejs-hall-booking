import express from "express";
import cors from 'cors';
import hallRoute from './Routers/hallbookingRouter.js' 
//importing part
//initalization
const app=express();
const  PORT= 4000;

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api',hallRoute)
//router
app.get('/',(req,res)=>{
res.status(200).send('App is running successfully')
})


//port
app.listen(PORT,()=>{
    console.log('App is listening to the port',PORT)
})
