// this will become the post route off the submit form
app.post("/api/submission_info", function(req,res){
    if(req.body.token){
        var dbQuery = "UPDATE flight_info SET start_time = ? end_time = ? max_altitude = ? token = ? VALUES (?,?,?,?)";
        connection.query(dbQuery, [req.body.start_time , req.body.end_time, req.body.max_altitude, req.body.token], function(err,results){
      if(err) throw err;
      res.redirect("/home");
  })
  }
  else{
      var dbQuery = "INSERT INTO flight_info (start_time, end_time, max_altitude, token) VALUES (?,?,?,?)";
      connection.query(dbQuery, [req.body.start_time, req.body.end_time, req.body.max_altitude, req.boyd.token], function (err,results){
          if (err) throw err;
          res.redirect("/home");
      })
  }
})