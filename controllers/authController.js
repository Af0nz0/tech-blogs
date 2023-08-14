const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

// Display the signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle user signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Log the user in after signup
    req.session.user = user;
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
});

// Display the login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Handle user logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
});



module.exports = router;
