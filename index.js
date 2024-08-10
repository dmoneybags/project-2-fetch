const express = require("express");
const exphbs = require("express-handlebars");

const allRoutes = require("./controllers");

const sequelize = require("./config/connection");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 30001
// Requiring our models for syncing
const { UserObj } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const hbs = exphbs.create({});
app.engine('handlebars', exphbs.engine({
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
  }
}));
app.set("view engine", "handlebars");

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});