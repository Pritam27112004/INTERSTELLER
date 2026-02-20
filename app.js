const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
//root api
app.get("/",(req,res)=>{
      res.send("hi this is root");
})
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
//route to test Listing Collection
// app.get("/testListing",async(req,res)=>{
//       let sampleListing = new Listing({
//          title: "Affordable Internship Room Near Tech Park",
//     description:
//       "Comfortable and budget-friendly room ideal for students doing internships. High-speed WiFi, study desk, and walking distance to major tech offices.",
//     image:
//       "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=60",
//     price: 8000,
//     location: "Bangalore",
//     country: "India",
//     wifiSpeed: "100 Mbps",
//     internDuration: "1-3 Months",
//     distanceFromTechPark: "1.2 km",
//     studyDesk: true,
//     powerBackup: true,
//     cctv: true,
//     biometricEntry: false,
//     genderType: "Co-Living",
//     roomType: "Shared",
//     mealsIncluded: true,
//     laundry: true,
//     nearCompanies: ["TCS", "Infosys", "Wipro"],
//     internFriendlyRating: 4.5,
//     verifiedByPlatform: true,
//     workspaceType: "Common Workspace",
//     metroDistance: "800m",
//     availableFrom: new Date("2026-06-01"),
//     recommendedFor: ["Engineering Interns", "Remote Developers"],
//       })
//     await sampleListing.save();
//     console.log("sample listing saved");
//     res.send("sample listing");
// })


//index route GET -> /listings = show all listings
// app.get("/listings",(req,res)=>{
//   Listing.find({}).then((res)=>{
//     console.log(res);
//   })
// })
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/listings",async(req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
})
app.use(express.urlencoded({extended:true}));
//create route
app.get("/listings/new",async(req,res)=>{
      res.render("listings/new.ejs");
})

app.post("/listings", async (req, res) => {
  let listingData = req.body.listingObj;

  // Convert checkboxes (because unchecked = undefined)
  listingData.studyDesk = listingData.studyDesk === "on";
  listingData.powerBackup = listingData.powerBackup === "on";
  listingData.cctv = listingData.cctv === "on";
  listingData.biometricEntry = listingData.biometricEntry === "on";
  listingData.mealsIncluded = listingData.mealsIncluded === "on";
  listingData.laundry = listingData.laundry === "on";

  const newListing = new Listing(listingData);
  await newListing.save();

  res.redirect("/listings");
});

//show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id); //->show.ejs
    res.render("listings/show.ejs",{listing});
})



app.listen(8080,()=>{
    console.log(`server is listning to port ${8080}`);
})