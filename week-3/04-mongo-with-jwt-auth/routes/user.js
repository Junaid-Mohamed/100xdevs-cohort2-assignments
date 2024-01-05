const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const secret = require("../config");
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

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  User.find({ username: username, password: password }).then((user) => {
    if (user) {
      let token = jwt.sign(
        { username: username, role: "user" },
        secret.JWT_SECRET
      );
      res.status(200).json(token);
    } else res.status(400).send("wrong credentails");
  });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({ published: true }).then((courses) =>
    res.status(200).json(courses)
  );
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.username;
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
  const user = await User.findOne({ username: req.username });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.status(200).json({ Courses: courses });
});

module.exports = router;
