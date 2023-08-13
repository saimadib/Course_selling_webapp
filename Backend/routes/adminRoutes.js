const express = require("express");
const router = express.Router();
const authAdmin = require("../controllers/authAdmin");
const {
  registerUser,
  loginUser,
} = require("../controllers/adminController");
const {courseCreate,courseUpdate, getCourse,courseDelete}=require("../controllers/courseController");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/courses").post(authAdmin,courseCreate);
router.route("/courses/:courseId").put(authAdmin,courseUpdate);
router.route("/courses").get(getCourse);
router.route("/courses/:courseId").delete(authAdmin,courseDelete);

module.exports = router;
