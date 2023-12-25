import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    // Set strict query mode for mongoose to prevent unknown field queries
    mongoose.set("strictQuery", true)

    if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

    // If the connection is already, return wiithout creating a new connection
    if (isConnected) {
        console.log("MongoDB connection already established");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}