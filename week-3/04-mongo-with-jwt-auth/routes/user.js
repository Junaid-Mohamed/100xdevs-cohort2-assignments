const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { jwt, jwtPassword } = require("../middleware/admin");
const { User, Course, CoursePurchased } = require("../db/index");

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
  User.findOne({ username: username, password: password }).then((admin) => {
    if (admin) {
      let token = jwt.sign({ username: username }, jwtPassword);
      res.status(200).json(token);
    } else res.status(400).send("wrong credentails");
  });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find().then((courses) => res.status(200).json(courses));
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  //   console.log(courseId);
  Course.findOne({ id: courseId }).then((course) => {
    if (course) {
      CoursePurchased.create({
        username: req.headers["username"],
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        imageLink: course.imageLink,
        published: course.published,
      });
      res.status(200).send("course purchased successfully.");
    } else {
      res.status(404).send(`Course not found`);
    }
  });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  CoursePurchased.find().then((courses) => res.status(200).json(courses));
});

module.exports = router;
