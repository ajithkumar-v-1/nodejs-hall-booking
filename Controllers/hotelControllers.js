const room = [
  {
    Room_name: "queen room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 1,
    customer_name: "saran",
    date: "29/05/2024",
    start_time: "10am",
    end_time: "5pm",
    booking_id: 1,
    booking_status: "booked",
    booking_date: "29/05/2024",
  },
  {
    Room_name: "single bedded",
    SeatsAvaliable: "2",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 2,
    customer_name: "divya",
    date: "28/05/2024",
    start_time: "1am",
    end_time: "9pm",
    booking_id: 2,
    booking_status: "booked",
    booking_date: "28/05/2024",
  },
  {
    Room_name: "king room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 3,
    customer_name: "sowmiya",
    date: "27/05/2024",
    start_time: "1am",
    end_time: "9pm",
    booking_id: 1,
    booking_status: "booked",
    booking_date: "27/05/2024",
  },
  {
    Room_name: "king room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 4,
    customer_name: "divya",
    date: "27/05/2024",
    booking_date: "27/05/2024",
    start_time: "1am",
    end_time: "9pm",
    booking_id: 2,
    booking_status: "booked",
  },
  {
    Room_name: "king room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 5,
  },
  {
    Room_name: "king room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 6,
  },
  {
    Room_name: "king room",
    SeatsAvaliable: "6",
    Amenities: ["wi-fi", "cooking", "room services"],
    pricehr: "100",
    Room_id: 7,
  },
];

//get the all  room details
export const roomDetails = (req, res) => {
  res.status(200).json({ message: "room details", data: room });
};

//create the room and post method

export const createRoom = (req, res) => {
  const { Room_name, SeatsAvaliable, Amenities, pricehr } = req.body;

  const newRoom = {
    Room_id: room.length + 1,
    Room_name: Room_name,
    SeatsAvaliable: SeatsAvaliable,
    Amenities: Amenities,
    pricehr: pricehr,
  };
  room.push(newRoom);

  res
    .status(200)
    .json({ message: " Roomdetail  created  successfully", data: newRoom });
};

//getting all room with booked data
export const roomsBookedData = (req, res) => {
  //getting the room details by map
  const bookeddata = room.map((ele) => {
    const {
      Room_name,
      booking_status,
      customer_name,
      date,
      end_time,
      start_time,
    } = ele;
    //if booked else means null(pending)
    if (booking_status == "booked") {
      return {
        Room_name,
        booking_status,
        customer_name,
        date,
        end_time,
        start_time,
      };
    }
  });
  res
    .status(200)
    .json({ message: "getting all  room with booked data", data: bookeddata });
};

//getting all customer with booked data
export const customerBookedData = (req, res) => {
  //getting the customer by map
  const customerdata = room.map((ele) => {
    const {
      customer_name,
      Room_name,
      date,
      start_time,
      end_time,
      booking_status,
    } = ele;
    //if booked customer else means null(pending)
    if (booking_status == "booked") {
      return {
        customer_name,
        Room_name,
        date,
        start_time,
        end_time,
      };
    }
  });
  res.status(200).json({
    message: "getting all customer with booked data",
    data: customerdata,
  });
};

//how many times a customer has booked the room with details

export const customerDetail = (req, res) => {
  //getting the name by params
  const cus_name = req.params.name;
  //checking the name
  const customerName = room.filter((ele) => ele.customer_name == cus_name);
  //if name is not present
  if (!customerName) {
    res.status(404).send("customer not found");
  }
  //if name present
  let customer = customerName.map((ele) => {
    const {
      customer_name,
      Room_name,
      date,
      start_time,
      end_time,
      booking_status,
      booking_id,
      booking_date,
    } = ele;
    return {
      customer_name,
      Room_name,
      date,
      start_time,
      end_time,
      booking_status,
      booking_id,
      booking_date,
    };
  });
  res.status(200).json({ Bookedcount: `${customer.length}`, data: customer });
};

//Booking the room and post method

export const bookingroom = (req, res) => {
  //getting the id by params
  const roomid = req.params.id;
  //checking whether the params id and roomid are equal
  const index = room.findIndex((ele) => ele.Room_id == roomid);
  if (index === -1) {
    res.status(404).send("rooms not available and enter correct room id");
  }
  //if book is already booked in that id
  if (room[index].booking_status == "booked") {
    res.status(200).send("room already booked");
  } else {
    //if book is not booked in that id
    const {
      customer_name,
      date,
      start_time,
      end_time,
      booking_id,
      booking_status,
    } = req.body;
    room[index].customer_name = customer_name;
    room[index].date = date;
    room[index].start_time = start_time;
    room[index].end_time = end_time;
    room[index].booking_status = booking_status;
    room[index].booking_id = booking_id;

    res
      .status(200)
      .json({ message: "Room booked successfully", data: room[index] });
  }
};
