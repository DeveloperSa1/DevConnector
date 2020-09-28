const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Users = require("../../modules/Users");

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/",
  [
    // The important data when user registerd
    check("name", "name is required").not().isEmpty(),
    check("email", "Please incluse a valid email").isEmail(),
    check("password", "Passowrd Must Be 6 or more  chars").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check If there's any error from The validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // errors represnets the request result after it's validated
      return res.status(400).json({ errors: errors.array() });
    }
    // Get the data from req.body (Body Parser see in server.js line :10) // we can get that with react
    const { name, email, password } = req.body;
    try {
      // we want to know if user already exisit so we going to find it in User model by going to User model in db see if it findes the email
      let user = await Users.findOne({ email });
      if (user) {
        // If so let's do that !!!
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      // If not < let's give him his gravatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Let's add it to user model to go to our database
      user = new Users({
        name,
        email,
        password,
        avatar,
      });

      // let's encrypt the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // Let's save him in our database
      await user.save();

      // Give him the seganture (JsonWebToken for A user)

      // Payload it's an object with information about the client
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Let's create for him new signuture so he can go in protected routes belongs to him
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // That's the singuntere we send to client as request
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
