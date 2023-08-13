
const course = require("../models/courseModel.js");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");



const errorMessage = (res, error) => {
    return res.status(400).json({ status: "fail", message: error.message });
};

exports.courseCreate = async (req, res) => {
    try {
        const { title, description, price,image} = req.body;
        const newCourse = new course({ title, description, price,image});
        await newCourse.save();
        res.status(200).json({
            message: "Course created successfully",
            courseId: newCourse._id,
        });
    }
    catch (error) {
        return errorMessage(res, error);
    }

}

exports.courseUpdate = async (req, res) => {
  try {
    const courseId = new mongoose.Types.ObjectId(req.params.courseId);
    const courseCheck = await course.findOne({ _id: courseId });

    if (courseCheck) {
      Object.assign(courseCheck, req.body);
      await courseCheck.save();
      res.json({ message: 'Course updated successfully' });
    } else {
      res.json({ message: 'Course not found' });
    }
  } catch (error) {
    return errorMessage(res, error);
  }
};



exports.getCourse = async (req, res) => {
    const courseget = await course.find();
    res.json(courseget);
}

exports.purchasingCourse = async (req, res) => {
    const courseCheck = await course.findById(req.params.courseId);
    if (courseCheck) {
      const user = await User.findById(req.user);
      if (user) {
        user.purchasedCourse.push(courseCheck);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  }

exports.purchasedCourse=async (req, res) => {
    const user = await User.findById(req.user);
    if (user) {
      const purchasedCourses = await course.find({ _id: { $in: user.purchasedCourse || [] } });

      res.json({ purchasedCourses: purchasedCourses });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  }

  
  
  exports.courseDelete = async (req, res) => {
    try {
      const courseId = new mongoose.Types.ObjectId(req.params.courseId);
      const courseCheck = await course.findOne({ _id: courseId });
  
      if (courseCheck) {
        await course.deleteOne({ _id: courseId }); // Corrected deletion method
        res.json({ message: 'Course deleted successfully' });
      } else {
        res.json({ message: 'Course not found' });
      }
    } catch (error) {
      return errorMessage(res, error);
    }
  };
  