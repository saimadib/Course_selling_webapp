const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/userController");
const {getCourse,purchasingCourse,purchasedCourse}=require("../controllers/courseController");
const authUser = require("../controllers/authUser");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/courses").get(getCourse);
router.route("/courses/:courseId").post(authUser,purchasingCourse);
router.route("/courses/purchasedCourses").get(authUser,purchasedCourse);

module.exports = router;
