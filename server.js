// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models/index.js");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
var crypto = require("crypto");

// Syncing our sequelize models and then starting our Express app
// =============================================================
  db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    }),
    db.login.create({
      user_name: "admin",
      password: "123"
    }),
    newToken = crypto.randomBytes(9).toString('hex');
    db.flight_plan.create({
      start_time: 1,
      end_time: 2,
      max_altitude: 3,
      token: newToken
    }),
    db.user.create({
      client_name: "bob",
      type_of_submission: "look",
      client_number: 4,
      drone_reg_number: 5,
      time_submitted: 22,
      features: {},
      token: newToken
    })
  });

