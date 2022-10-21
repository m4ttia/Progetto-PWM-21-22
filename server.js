const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./assets/models/user');


// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//Connect to MongoDB
const dbURI = 'mongodb+srv://webAppAdmin:PwmProject21-22@forecast.ceewsvj.mongodb.net/forecast?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) =>
    app.listen(port),
    console.log('Server started at http://localhost:' + port)
  )
  .catch((error) => console.log(error));


//Express static file module
app.use(express.static(__dirname + '/assets'));

//Save user in db
app.get('/add-user',(req,res) => {
  const user = new User({
    username: 'Mattia',
    password: '1234',
    cities: [{name: 'Milan', country: 'IT'}]
  });

  user.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

//Get users from db
app.get('/all-users', (req,res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get user by username from db
app.get('/single-user', (req,res) => {
  User.findOne({username: 'Mattia'})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Add city to a user
app.get('/add-city-to-user', (req,res) => {
  User.findOne({username: 'Mattia'})
    .then((result) => {
      var jsonObj = JSON.parse(JSON.stringify(result));
      let c = jsonObj.cities;
      c.push({name: 'London', country: 'UK'});
      User.updateOne({username: 'Mattia'}, {cities: c})
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// webWorker
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/city.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/city.html'));
});

app.get('/city.html/:city', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/city.html?'+req.params.city));
});
