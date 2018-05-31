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
            data: ""
        }).then(function(recieved) {
            $("#moreInfoModalBody").html(recieved);
            $("#moreInfoModal").modal('show');
        });
    });
    $(".weather").on("click", function(event) {
        event.preventDefault();
        var code = $(this).data("code");
        $.ajax("/user/" + code, {
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