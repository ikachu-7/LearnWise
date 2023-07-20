const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected at ${conn.connection.host}..`);
  } catch (error) {
    console.log(error);
  }
};
