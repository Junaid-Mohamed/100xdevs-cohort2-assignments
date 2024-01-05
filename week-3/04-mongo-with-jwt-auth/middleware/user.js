const jwt = require("jsonwebtoken");
// const jwtPassword = "pass12345";
const secret = require("../config");

// console.log(secret);
function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const jwtToken = token.split(" ")[1];
  //   console.log(token);

  try {
    const decodedValue = jwt.verify(jwtToken, secret.JWT_SECRET);
    // console.log(decodedValue);
    if (!decodedValue.username || !(decodedValue.role === "user"))
      res.status(403).json("Invalid credentials Please signin again.");
    else {
      // to send some data from this middleware to next middleware,
      // attach it to the req object.
      req.username = decodedValue.username;
      next();
    }
  } catch (e) {
    return res.status(403).json("Invalid credentials Please signin again.");
  }
}

module.exports = userMiddleware;
