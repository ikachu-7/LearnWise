const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.checkForAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization token missing" });
  }
};

exports.checkForteacher = async (req, res, next) => {
  try {
    const teacher = await UserModel.findById(req.user._id);
    if (teacher.role !== "teacher") {
      return res.status(400).json({ msg: "User is not teacher" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

exports.checkForstudent = async (req, res, next) => {
  try {
    const student = await UserModel.findById(req.user._id);
    if (student.role !== "student") {
      return res.status(400).json({ msg: "User is not student" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};
