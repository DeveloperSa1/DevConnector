const jwt = require("jsonwebtoken");
const config = require("config");

// Creating the middleware to verify the token ..
module.exports = function (req, res, next) {
  // Get the token from header when the request sends
  const token = req.header("x-auth-token");

  //check if the request with no token then throw some error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // If there's a token we want to make sure the token is correct with (decoded approch method in JWT)
  try {
    // Create Decoded Var assign it to jwtverify method it takes in 2 params one the token that has been sent with req the second : the secert to verify they match or not !!
    const decoded = jwt.verify(token, config.get("jwtSecret"));


    // Explaning
    // we know that middleware get access to req or res objects? right
    // req or res it's an object with values one of them is user, user coming from the client when he sends a req ..
    // we make the req.user refering to an object (decoded) that have some data about that user so we can regnoise him when he want to access his protcetd route
    req.user = decoded.user;

    
    next();
  } catch (err) {
    res.status(401).json({ msg: "No token!!" });
  }
};
