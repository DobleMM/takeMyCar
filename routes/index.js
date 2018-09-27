const express = require('express');
const router  = express.Router();
const Car = require("../models/Car");
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {user:req.user});
});

router.get("/carlist/coords", (req, res, next) => {
  Car.find({})
  .then( cars => {
  res.render("carlist", 
  {cars,
  carStr: JSON.stringify(cars)})
})
});



router.get("/:_id", (req, res, next) => {
  Car.findById(req.params)
  .then( car=> {
  res.render("car", car)
});
})





module.exports = router;
