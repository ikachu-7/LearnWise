const { sendMailforVerification } = require("../utils/emailHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
//Method - POS
// for register
exports.registerControllerForAuth = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    switch (true) {
      case !name:
        return res.status(400).json({ msg: "Name is required" });
      case !email:
        return res.status(400).json({ msg: "Email is required" });
      case !password:
        return res.status(400).json({ msg: "Password is required" });
      case !role:
        return res.status(400).json({ msg: "Role is required" });
      default:
        break;
    }
    const preUser = await UserModel.findOne({ name, email });
    if (preUser) {
      return res.status(400).json({
        msg: `${name} had already registered. Please Login to continue`,
      });
    }
    const newUser = new UserModel({ ...req.body });
    const temp = await newUser.save();
    res.status(201).json({
      success: true,
      msg: "Registration Successfull.Please check your email for verification",
    });
    sendMailforVerification(temp.name, temp.email, temp._id);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Error while Registering",
      error,
    });
  }
};

//METHOD - put; verify email

exports.VerifyEmailForAuth = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.updateOne({ _id: id }, { $set: { isVerified: true } });
    return res.status(200).json({ msg: "Email Verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

exports.LoginControllerForAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Create Account",
      });
    }
    if (user.isVerified == false) {
      return res.status(400).json({
        success: false,
        msg: "You are not verified. Check your email",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Password. Please enter correct Password",
      });
    }
    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      msg: "Login Successfull",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Error while login",
      error,
    });
  }
};
