const { Router } = require("express");
const { adminMiddleware } = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db/index");
const secret = require("../config");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({
    username: username,
    password: password,
  }).then(() => {
    res.status(200).send("admin created successfully");
  });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  Admin.find({ username: username, password: password }).then((admin) => {
    if (admin) {
      let token = jwt.sign(
        { username: username, role: "admin" },
        secret.JWT_SECRET
      );
      res.status(200).json(token);
    } else res.status(400).send("wrong credentails");
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
    published: req.body.published,
  }).then((course) => {
    res.status(200).json({
      Message: "Course create successfully.",
      "course id": course._id,
    });
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find().then((courses) => res.status(200).json(courses));
});

module.exports = router;
