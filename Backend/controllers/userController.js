const User = require("../models/userModel");
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
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(200).json({
          status: "fail",
          message: "An account with this username already exists.",
          type: "username",
        });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({ username, password: hashedPassword });
      const savedUser = await newUser.save();
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
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid credentials. Please try again.",
        });
      }

      console.log("1");
  
      const isMatch = await bcrypt.compare(password, user.password);

      console.log("2");
      if (!isMatch) {
        return res.status(200).json({
          status: "fail",
          message: "Invalid credentials. Please try again.",
        });
      }

      console.log("3");
      const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); 
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_USERSECRET,{ expiresIn: expirationTime });
      console.log("4");
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