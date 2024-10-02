import express from 'express';
import { createRoom, roomDetails,roomsBookedData,customerBookedData ,customerDetail,bookingroom} from '../Controllers/hotelControllers.js';
//importing part

//declaring router
const router=express.Router();

//routers
router.post('/createroom',createRoom)//creating the room
router.get('/room',roomDetails)//getting all the room details
router.get('/getbookeddata',roomsBookedData)////getting all room with booked data
router.get('/getcustomerdata',customerBookedData)//getting all customer with booked data
router.get('/customerdetail/:name',customerDetail)//how many times a customer has booked the room with details
router.put('/room/create/:id',bookingroom)//Booking the room 


//exporting port
export default router;