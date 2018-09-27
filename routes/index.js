const express = require('express');
const router  = express.Router();
const Car = require("../models/Car");
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user:req.user});
});

router.get("/carlist/coords", (req, res, next) => {
  const lat = req.query.lat
  const lng = req.query.lng
  console.log(lat, lng)
    Car.find({})
    .then( cars => {
    res.render("carlist", 
    {cars,
     carStr: JSON.stringify(cars),
     lat, 
     lng})
  })
});

router.get("/carlist", (req, res, next) => {
    Car.find({})
    .then( cars => {
    res.render("carlist", {cars})
  })
});

router.get("/:_id/coords", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Car.findById(req.params)
  .then( car=> {
  res.render("car", {car, carStr: JSON.stringify(car)})
});
})






module.exports = router;
