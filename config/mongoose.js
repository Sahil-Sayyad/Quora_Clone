// // import required package
const mongoose = require("mongoose");

const mongoDBurl =
  "mongodb+srv://igsahilsayyad:9325@quora.bp1ogml.mongodb.net/?retryWrites=true&w=majority";
// const mongoDBurl =
//   "mongodb://localhost:27017/mydb";

mongoose
  .connect(mongoDBurl)
  .then(() => console.log("MongoDB connected to db "))
  .catch((err) => console.log("Connection error in mongodb", err));
//Adding Mongoose Module Dependencies 
// const mongoose = require('mongoose');

// //Catching Error Here.
// main().catch(err=> console.log("Connection Error", err));

// //Conneting To Database .
// async function main(){
//     await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
//     console.log("Conneted To MongoDB");
// }