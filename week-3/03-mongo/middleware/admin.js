// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  //   console.log("in admin router\n", req.headers)
  if (
    !(req.headers["username"] === "admin" && req.headers["password"] === "pass")
  ) {
    return res.status(401).send("Unauthorized..");
  } else {
    next();
  }
}

module.exports = adminMiddleware;
