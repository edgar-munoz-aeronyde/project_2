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
});