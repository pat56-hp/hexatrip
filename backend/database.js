import mongoose from "mongoose";

//Uri for Porduction Database
const mongooseUriAtlas = ``;

//Uri for Local Database
const mongooseUriLocal = "mongodb://localhost:27017/hexa-trip";

//Uri for Database
let mongooseUri = "";

//Connection to the database
const connectToDatabase = async () => {
  try {
    //check if we are in production or local
    if (process.env.NODE_ENV === "production") mongooseUri = mongooseUriAtlas;
    else mongooseUri = mongooseUriLocal;

    await mongoose.connect(mongooseUri, {
      dbName: "hexa-trip",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: process.env.NODE_ENV === "production" ? true : false,
    });

    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

export default connectToDatabase;
