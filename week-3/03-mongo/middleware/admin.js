// Middleware for handling auth
const { Admin } = require("../db/index");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  //   console.log("in admin router\n", req.headers)
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({ username, password })
    .then((admin) => {
      if (!admin) {
        //early return
        // res.status(200).json({ user });
        res.status(403).send("Admin not found");
      } else {
        next();
      }
    })
    .catch((err) => console.log("error ", err));
}
module.exports = adminMiddleware;
