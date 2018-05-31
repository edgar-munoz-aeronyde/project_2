var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("NottheFAA", function() {
    this.timeout(10000);
    it("should log in as the admin user", function(done){
        Nightmare({ show: true })
            .goto("https://edgar-munoz-aeronyde.github.io/project_2/")
            .type("#username", "admin")
            .type("#password", "123")
            .click("#login")
            .wait("#links a")
            .evaluate(function() {
                var name = document.querySelector("#currentUser").val();
                return name;
            })
            .then(function(name) {
                expect(name).to.equal("admin");
                done();
            });
    })
})