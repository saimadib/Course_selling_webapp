require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path=require ("path");
const app = express();
const port = process.env.PORT || 5000;
const cors=require("cors");


app.use(express.json());
// CORS configuration
app.use(cors());
mongoose.connect("mongodb+srv://admin-saim:3xzUdBv3qYEghdhR@cluster0.fzd8b5a.mongodb.net/course_selling");

// Import and use your route handlers here
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.use(express.static("public"));



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
