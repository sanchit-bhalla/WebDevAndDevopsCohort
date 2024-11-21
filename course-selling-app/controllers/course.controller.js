const { z } = require("zod");
const { Course } = require("../models/course.model");
const { Purchase } = require("../models/purchase.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const purchaseCourse = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { courseId } = req.body;

  const course = await Course.findById(courseId).select("title description");
  if (!course) throw new ApiError(400, "Course Not Found!");

  const purchasedCourse = await Purchase.findOne({
    course: courseId,
    user: userId,
  });
  if (purchasedCourse)
    throw new ApiError(409, "You have already purchased this course");

  // check user paid the price or not

  await Purchase.create({ user: userId, course: courseId });

  return res
    .status(201)
    .json(
      new ApiResponse(201, course, "You have successfully bought the course")
    );
});

const previewCourses = asyncHandler(async (req, res) => {
  // TODO: use something like pagination to show courses in batches
  const courses = await Course.find({});
  return res.status(200).json(new ApiResponse(200, courses));
});

module.exports = { purchaseCourse, previewCourses };
