//reqiering mongoose
const mongoose = require("mongoose");
//requiring sample data
const initData = require("./data.js");
//requiering models
const Listing = require("../models/listing.js");
//connecting with my mongodb database
const MONGO_URL = "mongodb://127.0.0.1:27017/INTERSTELLER"
async function main() {
     mongoose.connect(MONGO_URL);
}
//calling main 
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
const initDB = async() => {
   //delete existing data
   await Listing.deleteMany({});
   //insering data
   await Listing.insertMany(initData.data);
   console.log("data was saved");
}
initDB();



// // requiring mongoose
// const mongoose = require("mongoose");

// //requiring sample data
// const initData = require("./data.js");


// // requiring models
// const Listing = require("../models/listing.js");

// // connecting with my mongodb database
// const MONGO_URL = "mongodb://127.0.0.1:27017/INTERSTELLER";

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// main()
//   .then(async () => {
//     console.log("connected to db");

//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);

//     console.log("data was saved");
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
