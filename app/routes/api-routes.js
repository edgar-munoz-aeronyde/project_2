var connection = require("./connection.js");
var crypto = require("crypto");



module.exports = function(app){

app.get("/", function(req, res){
  // this will send the admin to the login page
})    

app.get("/home", function(req, res) {
  var dbQuery = "SELECT * FROM flight_info";
  connection.query(dbQuery, function(err, result) {
    if (err) throw err;
    res.render("home", {"flight_info": result, "user": req.body})
  });
  // res.JSON(req.body);
});


// this will become the post route off the submit form
app.post("/api/submission_info", function(req,res){
  if(req.body.token){
    var flightPlanQuery = "UPDATE flight_plan SET start_time = ? end_time = ? max_altitude = ? WHERE token = " + req.body.token;
    connection.query(flightPlanQuery, [req.body.start_time, req.body.end_time, req.body.max_altitude], function(err,results){
      if(err) throw err;
      res.json(results);
    })
    var userQuery = "UPDATE user SET client_name = ? type_of_submission = ? client_number = ? drone_reg_number = ? time_submitted = ? features = ? WHERE token = " + req.body.token;
    connection.query(userQuery, [req.body.client_name, req.body.type_of_submission, req.body.client_number, req.body.drone_reg_number, req.body.time_submitted, req.body.features], function(err,results){
      if(err) throw err;
      res.json(results);
    })
  }
  else{
    token = crypto.randomBytes(9).toString('hex');
    var flightPlanQuery = "INSERT INTO flight_plan (start_time, end_time, max_altitude, token)";
    connection.query(flightPlanQuery, [req.body.start_time, req.body.end_time, req.body.max_altitude, token], function (err,results){
        if (err) throw err;
        res.json(results);
    })
    var userQuery = "INSERT INTO user (client_name, type_of_submission, client_number, drone_reg_number, time_submitted, token, features)";
    connection.query(userQuery, [req.body.client_name, req.body.type_of_submission, req.body.client_number, req.body.drone_reg_number, req.body.time_submitted, token, req.body.features], function (err,results){
        if (err) throw err;
        res.json(results);
    })
  }
})

//this will be the delete route

app.get("/delete/:id", function(req, res){
  var currentRow = req.params.id;
  var flightPlanQuery = "DELETE FROM flight_info WHERE id = " + currentRow;
  connection.query(flightPlanQuery, function(result){
    if (res.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      console.log("row " + currentRow + "deleted from flight plan table");
    }
  });
  var userQuery = "DELETE FROM user WHERE id = " + currentRow;
  connection.query(userQuery, function(result){
    if (res.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      console.log("row " + currentRow + "deleted from user table");
    }
  });
  
});

};