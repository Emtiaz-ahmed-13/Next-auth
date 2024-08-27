import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.log("Mongodb connection error to database", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}
