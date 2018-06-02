var db = require("../models");
var crypto = require("crypto");
var path = require("path");

module.exports = function(app){

app.get("/", function(req, res) {
  res.render(path.join(__dirname, "../views/index.handlebars"));
});

// route from login page to check submitted login information is correct
app.get("/login", function(req, res){
  console.log("before database connection");
    db.login.findAll({
    }).then(function(result){
      res.json(result)
    });
});   

// route to load the home page of the app with table information
app.get("/home", function(req, res) {
  console.log("got home page request");
  db.user.findAll({
  }).then(function(result){
    var flight_info = result
    console.log(flight_info);
    res.render(path.join(__dirname, "../views/home.handlebars"), flight_info)
  });
});

// route for getting more infomation on specific flight
app.get("/home/:id", function(req, res) {
  db.flight_plan.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(result){
    res.json(result);
  })
});

// route for grabbing all user information for a specific flight
app.get("/user/:id", function(req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.json(result);
  })
});

// this will become the post route for any flights submitted to us
app.post("/api/submission_info", function(req,res){
    // if they already have a token
  if(req.body.token){
      // update flight_plan table
    db.flight_plan.update(req.body, {
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      max_altitude: req.body.max_altitude,
      where: {
        token: req.body.token
      }
    }).then(function(results){
      res.json(results);
    })
    // update user table
    db.user.update(req.body, {
      client_name: req.body.client_name,
      type_of_submission: req.body.type_of_submission,
      client_number: req.body.client_number,
      drone_reg_number: req.body.drone_reg_number,
      time_submitted: req.body.time_submitted,
      features: req.body.features,
      where: {
        token: req.body.token
      }
    }).then(function(results){
      res.json(results);
    })
  }
  // if this is a new flight submission request and therefore has no token associated with it
  else{
    // create the random token
    newToken = crypto.randomBytes(9).toString('hex');
    // create new entry in flight plan table
    console.log(req.body);
    db.flight_plan.create(req.body, {
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      max_altitude: req.body.max_altitude,
      token: newToken
    }).then(function(results){
      res.json(results);
    })
    // create new entry into user table
    db.user.create(req.body, {
      client_name: req.body.client_name,
      type_of_submission: req.body.type_of_submission,
      client_number: req.body.client_number,
      drone_reg_number: req.body.drone_reg_number,
      time_submitted: req.body.time_submitted,
      features: req.body.features,
      token: newToken
    }).then(function(results){
      res.json(results);
    })
  }
})

//this will be the delete route for both tables

app.delete("/delete/:id", function(req, res){
  var currentRow = req.params.id;
  db.user.destroy({
    where: {
      id: currentRow
    }
  }).then(function(response){
    res.json(response);
    console.log("row " + currentRow + "deleted from user table");
  });
  db.flight_plan.destroy({
    where: {
      id: currentRow
    }
  }).then(function(response){
    res.json(response);
    console.log("row " + currentRow + "deleted from flight plan table");
  })
});


// route for updating the approval status for any flights
app.put("/api/userUpdate/:id", function(req, res){
    var currentRow = req.params.id;
    var statusChange = req.body.approval_status;
    db.user.update({
      where: {
        id: currentRow
      },
      approval_status: statusChange
    }).then(function(result){
      res.json(result);
      console.log("approval status updated");
    })
  });

// closing for entire routes function
};

