$(function() {
    // on click event for submitting their username and password  
    $("#submit").on("click", function(event) {
        event.preventDefault();
        var enteredUsername = $("#username").val().trim();
        var enteredPassword = $("#password").val().trim();
        console.log("before ajax, have the following: " + enteredUsername + " " + enteredPassword);
        // perform ajax call to get information from login table
        $.ajax("/login", {
            type: "GET",
            data: "",
            // if call is successful, check to see if user submitted data matches what isin the login table
            success: function(data) {
                var count = 0;
                data.forEach(function(element)  {
                    console.log(element.id);
                    if (element.user_name === enteredUsername && element.password === enteredPassword) {
                        console.log("match")
                        $.ajax("/home", {
                            type: "GET",
                            data: element.user_name
                        }).then(function(username) {
                            console.log("sucessfully logged in as " + username);
                            { break; }
                        });
                    }
                    count++;
                    console.log(count);
                })
                // if it wasn't, add this message to the page so the user knows to retry their submission
                if (count === data.length) {
                    var message = $("<p>").text("Your username and password combination does not match any in our database");
                    $("#login").append(message);
                }
            }
        })   
    });
    // on click for approving a flight
    $(".approve").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        var action = {
            approval_status: true
        }
        $.ajax("/api/userUpdate/" + id, {
            type: "PUT",
            data: action
        }).then(function() {
            location.reload();
        });
    });
    // on click for disapproving a flight
    $(".notApprove").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        var action = {
            approval_status: false
        }
        $.ajax("/api/userUpdate/" + id, {
            type: "PUT",
            data: action
        }).then(function() {
            location.reload();
        });
    });
    // on click for creating grabbing more information on a specific flight, then popping up a modal to display that information
    $(".moreInfo").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        $.ajax("home/" + id, {
            type: "GET",
            data: ""
        }).then(function(recieved) {
            $("#moreInfoModalBody").html(recieved);
            $("#moreInfoModal").modal('show');
        });
    });
    // on click for getting specific flight information from flight_plan table, then doing a weather api call at that location and displaying that information in a modal
    $(".weather").on("click", function(event) {
        event.preventDefault();
        var id = $(this).data("id");
        $.ajax("/user/" + id, {
            type: "GET",
            url: ""
        }).then(function(planData) {
            var xStart = planData.features.point1.x;
            var yStart = plantData.features.point1.y;
            $.ajax("https://tile.openweathermap.org/map/clouds_new/5/" + xStart + "/" + yStart + ".png?appid=2626d7eb76d0259ea5d3e2117882a27d", {
                type: "GET",
                data: ""
            }).then(function(weather) {
                $("#weatherModalBody").html(weather);
                $("#weatherModal").modal('show');
            });
        });
    });
});