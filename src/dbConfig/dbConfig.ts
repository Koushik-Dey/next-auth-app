import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfylly")
        })

        connection.on("error", (err) => {
            console.log("MongoDB connection error. Please make sure MMongoDB is running. " + err)
        })

    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}