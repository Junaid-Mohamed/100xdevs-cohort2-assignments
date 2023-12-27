const { jwt, jwtPassword } = require("../middleware/admin");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  try {
    jwt.verify(token, jwtPassword);
    next();
  } catch (e) {
    return res.status(403).json("Invalid credentials Please signin again.");
  }
}

module.exports = userMiddleware;
