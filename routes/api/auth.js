const express = require("express");
const router = express.Router();
const User = require("../../modules/Users");
const auth = require("../../middleware/auth");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// @route     Get api/auth
// @desc      Get a user data
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    // create user varible assign it to the usermodel spicefied id ( We get that id from the payload so  we can find it in User model) for the user and we dont want the password for secuirty perposes
    const user = await User.findById(req.user.id).select("-password");
    // now send the user data with json format
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error..");
  }
});

// @route     POST api
// @desc      Get a user logged in
// @access    Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please include the password").exists(),
  ],
  async (req, res) => {
    // Check if inputs typed correctly
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if not then
      return res.status(400).json({ errors: errors.array() });
    }
    // if it's correct the take the data been sent from user Which is (Email and password)//
    const { email, password } = req.body;
    try {
      // first make sure that email is regseterd
      let user = await User.findOne({ email });
      if (!user) {
        // if not then
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credintial" }] });
      }

      // Check if password match with email
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // if password dosen't match then
        res.status(400).json({ errors: [{ msg: "Invalid Credintial" }] });
      }

      // let's give him the signutre
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // Then we get the user token so he can do anything in protcted routes
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
