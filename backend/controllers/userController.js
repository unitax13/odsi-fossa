const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const delay = require("delay");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //TODO: Dorobić negatywne nastawienie !!!!
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check pass length
  if (password.length < 4) {
    res.status(400);
    throw new Error("Password should have at least 4 characters");
  }

  if (password.length > 32) {
    res.status(400);
    throw new Error("Password should have up to 32 characters");
  }

  if (email.length > 48) {
    res.status(400);
    throw new Error("Email should have up to 48 characters");
  }

  if (name.length > 48) {
    res.status(400);
    throw new Error("Username should have up to 48 characters");
  }

  const re =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  try {
    if (!re.test(email)) {
      res.status(400);
      throw new Error("Please enter valid e-mail address");
    }
  } catch (e) {
    res.status(400);
    throw new Error("Please enter valid e-mail address");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (password.length > 32) {
    res.status(400);
    throw new Error("Invalid credentials");
    // throw new Error("Password should have up to 32 characters")
  }

  if (email.length > 48) {
    res.status(400);
    throw new Error("Invalid credentials");
    // throw new Error("Email should have up to 48 characters")
  }

  const re =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!re.test(email)) {
    res.status(400);
    throw new Error("Invalid credentials");
    // throw new Error("Please enter valid e-mail address")
  }

  //CHeck for user email
  const user = await User.findOne({ email });

  if (!user || user == null) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const difference = Date.now() - user.lastPendingLogin;

  // if (user) {
  //   console.log(
  //     Date.now().toLocaleString() +
  //       " --- User " +
  //       user.name +
  //       ", last pending login at " +
  //       user.lastPendingLogin.toLocaleString() +
  //       " requesting a login " +
  //       difference +
  //       " from last login"
  //   );
  //   //   //   user.lastPendingLogin = Date.now();
  //   //   //   // await user.save()
  // }

  if (user) {
    if (!difference || difference > 3000) {
      try {
        // console.log("user found");
        isTooManyFailedLogins = false;
        if (await bcrypt.compare(password, user.password)) {
          // console.log("password was correct");
          user.failedLogins = 0;
          user.lastPendingLogin = Date.now();
          await user.save();

          res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          // console.log("password was incorrect");
          // console.log(" difference = " + difference);
          user.failedLogins = user.failedLogins + 1;
          user.lastPendingLogin = Date.now();
          await user.save();

          if (user.failedLogins >= 3) {
            await delay(2000);
            res.status(400);
            isTooManyFailedLogins = true;
            throw new Error(
              "Too many failed logins. Try again in a few seconds."
            );
          } else {
            res.status(400);
            throw new Error("Invalid credentials");
          }
        }
      } catch (e) {
        res.status(400);
        // throw e;
        if (isTooManyFailedLogins) {
          throw new Error(
            "Too many failed logins. Try again in a few seconds."
          );
        }
        throw new Error("Invalid credentials");
      }
    } else {
      await delay(2000);
      res.status(400);
      throw new Error("Too many failed logins. Try again in a few seconds.");
    }
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  // console.log("req user:" + req.user)
  // const bigUser = await User.findById(req.user.id)
  // console.log("Big user: " + bigUser)
  // const {_id, name, email} = await User.findById(req.user.id)
  res.status(200).json({ user: req.user });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
