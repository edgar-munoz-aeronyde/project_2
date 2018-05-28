$(function() {  
    $("#submit").on("click", function(event) {
        event.preventDefault();
        var enteredUsername = $("#username").val().trim();
        var enteredPassword = $("#password").val().trim();
        $.ajax("/", {
            type: "GET",
            data: ""
        }).then(function(data) {
            data.forEach(function()  {
                if (username === enteredUsername && password === enteredPassword) {
                    $.ajax("/home", {
                        type: "GET",
                        data: username
                    }).then(function() {
                        console.log("sucessfully logged in as " + username);
                    });
                } else {
                    location.reload();
                    var message = $("<p>").text("Your username and password combination does not match any in our database");
                    $("#login").append(message);
                }
            });
        });
    });
    $(".approve").on("click", function(event) {
        event.preventDefault();
        var code = $(this).data("code");
        var action = {
            approvalStatus: true
        }
        $.ajax("/api/flight_info/" + code, {
            type: "PUT",
            data: action
        }).then(function() {
            location.reload();
        });
    });
    $(".notApprove").on("click", function(event) {
        event.preventDefault();
        var code = $(this).data("code");
        var action = {
            approvalStatus: false
        }
        $.ajax("/api/flight_info/" + code, {
            type: "PUT",
            data: action
        }).then(function() {
            location.reload();
        });
    });
    $(".moreInfo").on("click", function(event) {
        event.preventDefault();
        var code = $(this).data("code");
        $.ajax("/" + code, {
            type: "GET",
            data: "",
            success: function(data){
                $("#moreInfoModalBody").html(data);
                $("#moreInfoModal").modal('show');
            }
        }).then(function() {
            // create javascript that makes popup window to show full detailed information on flight here.
        });
    });
    $(".weather").on("click", function(event) {
        event.preventDefault();
        var code = $(this).data("code");
        $.ajax("/flight_plan/" + code, {
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=2626d7eb76d0259ea5d3e2117882a27d"
        }).then(function(data) {
            $.ajax("weather api address here", {
                type: "GET",
                data: "",
                success: function(data){
                    $("#weatherModalBody").html(data);
                    $("#weatherModal").modal('show');
                }
            }).then(function(weather) {
                // create popup window using weather api data and coordinates from data
            });
        });
    });
});