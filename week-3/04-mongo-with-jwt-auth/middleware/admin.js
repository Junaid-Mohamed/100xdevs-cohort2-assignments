// Middleware for handling auth
const jwt = require("jsonwebtoken");
const jwtPassword = "pass12345";

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  //   console.log(token);

  try {
    jwt.verify(token, jwtPassword);
    next();
  } catch (e) {
    return res.status(403).json("Invalid credentials Please signin again.");
  }
}

module.exports = { adminMiddleware, jwt, jwtPassword };
