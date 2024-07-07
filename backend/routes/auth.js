const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchuser")


// const JWT_SCRT = process.env.JWT_SCRT
const JWT_SCRT = "PasswordIsHere"

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZGI4ODFkMWQxNTRiNDNlOTEyMjc4In0sImlhdCI6MTcxOTUxNTI2NX0.QtBRHjMVTv6qpr-_DqN2sTm8GAfdvD8xIhYXoAmWX_A

// ROUTE 1:  Create a User using: Post "/api/auth/createuser", no login required
router.post("/createuser", [
  body('email', 'Enter a valid E-mail').isEmail(),
  body('password', 'Password must be atleast five characters').isLength({ min: 5 }),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
],

  // If there are errors, return bad request and the errors
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // Check whether the user with the same email exits
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "Sorry the user with this email is already exist" })
      }

      // Create user
      const salt = await bcrypt.genSalt(15);
      const secpass = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      });

      const data = {
        user: {
          id: user.id
        }
      }
      success = true;
      const authtoken = jwt.sign(data, JWT_SCRT);
      res.json({success, authtoken })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error ")
    }
  })

//ROUTE 2:  AUthenticate a user using: Post "/api/auth/login", no login required

router.post("/login", [
  body('email', 'Enter a valid E-mail').isEmail(),
  body("password", "Password cannot be blank").exists()
],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
        res.status(400).json({ success , error: "Please login with correct credentials" })
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        res.status(400).json({success, error: "Please login with correct credentials" })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SCRT);
      success = true
      res.json({success ,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

//ROUTE 3:  Get loggedin user details :using Post "/api/auth/getuser",login required
router.post("/getuser", fetchUser,

  // If there are errors, return bad request and the errors
  async (req, res) => {

   try{
    userId = req.user.id
    const user =await User.findById(userId).select("-password")
    res.send(user)
    console.log(user)
   }catch (error) {
      console.error(error.message);
      res.status(500).send("Internal ServerError");
    }
  })

module.exports = router;