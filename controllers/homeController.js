const express = require("express");
const { Post } = require("../models");

const router = express.Router();

// Display the homepage with existing blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render("home", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving posts");
  }
});

// Display the dashboard
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard");
});

module.exports = router;
