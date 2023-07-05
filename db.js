import mongoose from "mongoose";
const mongoURI =
  "mongodb+srv://chaetesh:aetesh1234@cluster0.z14sfn0.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () => {
try {
      mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongod Succesfully");
      });
} catch (error) {
    console.log(error);
}
};

// This module will get exported
export default connectToMongo;