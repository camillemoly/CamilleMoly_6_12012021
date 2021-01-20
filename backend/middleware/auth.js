const jwt = require("jsonwebtoken");
const user = require("../controllers/user");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, user.secretKey); // decode the token (object) with secretKey randomly generated
    const userId = decodedToken.userId; // take userId of decodedToken object
    if (req.body.userId && req.body.userId !== userId) { // compare req userId and userId decoded of token
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!")
    });
  }
};