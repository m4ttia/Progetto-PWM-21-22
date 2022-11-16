const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./assets/models/user');


// Configure dotenv package
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//Connect to MongoDB
const dbURI = 'mongodb+srv://<username>:<password>@forecast.ceewsvj.mongodb.net/forecast?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) =>
    app.listen(port),
    console.log('Server started at http://localhost:' + port)
  )
  .catch((error) => console.log(error));


//Express static file module
app.use(express.static(__dirname + '/assets'));

app.use(express.urlencoded({extended: true}));

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
  User.findOne({username: req.query.usr_name})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get user by username and password from db
app.get('/login', (req,res) => {
  User.findOne({username: req.query.usr_name,password: req.query.pwd})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Create new user in db
app.post('/new-user', (req,res) => {
  const user = new User({
    username: req.body.usr_name,
    password: req.body.pwd,
    cities: []
  });

  user.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
});

//Add city to a user
app.put('/add-city-to-user', (req,res) => {
  User.findOne({username: req.body.usr_name})
    .then((result) => {
      var jsonObj = JSON.parse(JSON.stringify(result));
      let c = jsonObj.cities;
      let s = req.body.city;
      console.log('Storing city '+ s +' for user '+ req.body.usr_name);
      let cityParams = s.split(', ');
      if(cityParams.length > 1)
        c.push({name: cityParams[0], country: cityParams[1]});
      else
        c.push({name: cityParams[0]});
      User.updateOne({username: req.body.usr_name}, {cities: c})
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
