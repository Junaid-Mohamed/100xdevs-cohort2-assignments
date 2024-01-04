const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username: username,
    password: password,
  });

  res.status(200).send("user created successfully");
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  // here route is not protected, but not all courses are showed here, only the ones published are shown
  // in real world something similar logic will be written
  // but admin route to /courses is protected because there all the courses
  // even the ones not published will be available to see.
  Course.find({ published: true }).then((courses) =>
    res.status(200).json(courses)
  );
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      { username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
  res.json({
    message: "Purchase Complete.",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  // CoursePurchased.find().then((courses) => res.status(200).json(courses));
  const user = await User.findOne({ username: req.headers.username });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.status(200).json({ Courses: courses });
});

module.exports = router;
