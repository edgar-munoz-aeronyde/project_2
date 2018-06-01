var connection = require("./connection.js");
var crypto = require("crypto");



module.exports = function(app){

// route from login page to check submitted login information is correct
app.get("/", function(req, res){
    var loginQuery = "SELECT * FROM login";
    connection.query(loginQuery, function(err, result) {
        if (err) throw err;
        res.json(result)
    });
});   

// route to load the home page of the app with table information
app.get("/home", function(req, res) {
  var dbQuery = "SELECT * FROM user";
  connection.query(dbQuery, function(err, result) {
    if (err) throw err;
    res.render("home", {"user": result, "currentUser": req.body})
  });
});

// route for getting more infomation on specific flight
app.get("/home/:id", function(req, res) {
    var dbQuery = "SELECT * FROM flight_info WHERE id = " + req.params.id;
    connection.query(dbQuery, function(err, result) {
        if (err) throw err;
        res.json({"flight_info": result})
    });
});

// route for grabbing all user information for a specific flight
app.get("/user/:id", function(req, res) {
    var dbQuery = "SELECT * FROM user WHERE id = " + req.params.id;
    connection.query(dbQuery, function(err, result) {
        if (err) throw err;
        res.json({"user": result})
    });
});

// this will become the post route for any flights submitted to us
app.post("/api/submission_info", function(req,res){
    // if they already have a token
  if(req.body.token){
      // update flight_plan table
    var flightPlanQuery = "UPDATE flight_plan SET start_time = ? end_time = ? max_altitude = ? WHERE token = " + req.body.token;
    connection.query(flightPlanQuery, [req.body.start_time, req.body.end_time, req.body.max_altitude], function(err,results){
      if(err) throw err;
      res.json(results);
    })
    // update user table
    var userQuery = "UPDATE user SET client_name = ? type_of_submission = ? client_number = ? drone_reg_number = ? time_submitted = ? features = ? WHERE token = " + req.body.token;
    connection.query(userQuery, [req.body.client_name, req.body.type_of_submission, req.body.client_number, req.body.drone_reg_number, req.body.time_submitted, req.body.features], function(err,results){
      if(err) throw err;
      res.json(results);
    })
  }
  // if this is a new flight submission request and therefore has no token associated with it
  else{
    // create the random token
    token = crypto.randomBytes(9).toString('hex');
    // create new entry in flight plan table
    var flightPlanQuery = "INSERT INTO flight_plan (start_time, end_time, max_altitude, token)";
    connection.query(flightPlanQuery, [req.body.start_time, req.body.end_time, req.body.max_altitude, token], function (err,results){
        if (err) throw err;
        res.json(results);
    })
    // create new entry into user table
    var userQuery = "INSERT INTO user (client_name, type_of_submission, client_number, drone_reg_number, time_submitted, token, features)";
    connection.query(userQuery, [req.body.client_name, req.body.type_of_submission, req.body.client_number, req.body.drone_reg_number, req.body.time_submitted, token, req.body.features], function (err,results){
        if (err) throw err;
        res.json(results);
    })
  }
})

//this will be the delete route for both tables

app.delete("/delete/:id", function(req, res){
  var currentRow = req.params.id;
  var flightPlanQuery = "DELETE FROM flight_info WHERE id = " + currentRow;
  connection.query(flightPlanQuery, function(result){
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return result.status(404).end();
    } else {
      console.log("row " + currentRow + "deleted from flight plan table");
    }
  });
  var userQuery = "DELETE FROM user WHERE id = " + currentRow;
  connection.query(userQuery, function(result){
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return result.status(404).end();
    } else {
      console.log("row " + currentRow + "deleted from user table");
    }
  });
});


// route for updating the approval status for any flights
app.put("/api/userUpdate/:id", function(req, res){
    var currentRow = req.params.id;
    var statusChange = req.body.approval_status;
    var userQuery = "UPDATE approval_status = ? WHERE id = " + currentRow;
    connection.query(userQuery, [statusChange], function(result){
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return result.status(404).end();
      } else {
        console.log("approval status updated");
      }
    });
  });

// closing for entire routes function
};

