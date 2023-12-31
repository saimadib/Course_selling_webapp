const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorMessage = (res, error) => {
    return res.status(400).json({ status: "fail", message: error.message });
  };
  
  exports.registerUser = async (req, res) => 
  {
    try 
    {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(200).json({
          status: "fail",
          message: "Not all fields have been entered",
        });
      }
      if (password.length < 6 || password.length > 25) {
        return res.status(200).json({
          status: "fail",
          message: "Password must be between 6-25 characters",
          type: "password",
        });
      }
  
      const existingUser = await Admin.findOne({ username });
      if (existingUser) {
        return res.status(200).json({
          status: "fail",
          message: "An account with this username already exists.",
          type: "username",
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newAdmin = new Admin({ username, password: hashedPassword });
      const savedUser = await newAdmin.save();
      res.status(201).json(savedUser);
    } 
    catch (error) 
    {
      return errorMessage(res, error);
    }
  };

  exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(200).json({
          status: "fail",
          message: "Not all fields have been entered.",
        });
      }
  
      const user = await Admin.findOne({ username });
  
      if (!user) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid credentials. Please try again.",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid credentials. Please try again.",
        });
      }
      const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour from now
  
      const token = jwt.sign({ id: user._id }, "saim",{ expiresIn: expirationTime });
      return res.status(200).json({
        token,
        user: {
          username,
          id: user._id,
        },
      });
    } catch (error) {
      return errorMessage(res, error);
    }
  };