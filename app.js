//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const bootstrap = require("bootstrap");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
      email_address: email,
      status:"subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us1.api.mailchimp.com/3.0/lists/1d3edc0ee9";

const options = {
  method:"POST",
  auth: "detonishhhh:84fc1ef3f3d347bc75b9adfe78716987-us1"
}

const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html")

  } else {
    res.sendFile(__dirname + "/failure.html");
  }




  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

// request.write(jsonData);
request.end();

console.log(firstName, lastName, email);
});

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function() {
  console.log("Server is running on port 3000")
});


//API KEY MAILCHIMP
// 84fc1ef3f3d347bc75b9adfe78716987-us1

// audience 1d3edc0ee9


//jshint esversion: 6
