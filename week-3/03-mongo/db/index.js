const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://Junaid:4n7szfUVQLhqE4jy@cluster0.yswgdkp.mongodb.net/course-selling-app1"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  // id: Number,
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// const UserPurchasedCourseSchema = new mongoose.Schema({
//   username: String,
//   id: Number,
//   title: String,
//   description: String,
//   price: Number,
//   imageLink: String,
//   published: Boolean,
// });

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
// const CoursePurchased = mongoose.model(
//   "CoursePurchased",
//   UserPurchasedCourseSchema
// );

module.exports = {
  Admin,
  User,
  Course,
  // CoursePurchased,
};
