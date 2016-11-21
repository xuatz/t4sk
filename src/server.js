// Require
var postmark = require("postmark");

// Example request
var client = new postmark.Client("e071ef98-7979-43ac-978e-4e54e3d55459");

client.sendEmail({
    "From": "xzlow10@gmail.com",
    "To": "xzlow10@gmail.com",
    "Subject": "Test", 
    "TextBody": "Hello from Postmark!"
}, function(err, res) {
	console.log(err);

	console.log(res);
});