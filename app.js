// app.js
const express = require("express");
const session = require("express-session");
const { sequelize } = require("./models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const authController = require("./controllers/authController");
const homeController = require("./controllers/homeController");
const postController = require("./controllers/postController");
const exphbs = require("express-handlebars"); // Import express-handlebars

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session configuration
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Set up express-handlebars as the view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Use controllers
app.use(authController);
app.use(homeController);
app.use(postController);

// ...

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
