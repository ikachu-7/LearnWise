const express = require("express");
const { connectDB } = require("./db/connectDb");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use("/uploads", express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/courseRoutes"));
app.use("/api/v1", require("./routes/studentRoutes"));
const port = process.env.PORT || 8090;

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
})();
