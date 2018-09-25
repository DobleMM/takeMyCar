const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const flash = require('connect-flash')
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login')


router.get("/profile", ensureLoggedIn("/auth/login"), (req, res, next) => {
    res.render("private/profile", { "message": req.flash("error")}) 
});

router.get("/:id/editcar", (req, res, next) => {
  id = req.params.id
  Car.findById(id)
  .then( car => {
    console.log(car)
    res.render("private/editcar", {car, id});
  })
});

router.post("/:id/editcar", (req, res, next) => {
  id = req.params.id
  console.log(req.params.id)
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  let available;
  (req.body.available == 'on') ? available = true : available = false;

  Car.findByIdAndUpdate(id, {year, carMake, model, km, latitude, longitude, available})
  .then(() => {
    res.redirect("/private/profilecars")
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/addcar", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("private/addcar", { "message": req.flash("error")}) 
});

router.get("/profilecars", ensureLoggedIn(), (req, res, next) => {
  Car.find({})
  .then( cars => {
    res.render("private/profilecars", {cars});
  })
})

router.post("/profilecars", ensureLoggedIn(), (req, res, next) => {
  console.log(req.body)
  const owner = req.session.passport.user;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  let available;
  (req.body.available == 'on') ? available = true : available = false;

  const newCar = new Car({  
    owner,
    year,
    carMake,
    model,
    km,
    available,
    latitude,
    longitude
  });

  newCar.save()
  .then(() => {
    res.redirect("/private/profilecars");
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/:id/delete-car", (req, res, next) => {
  id = req.params.id
  Car.findOneAndRemove({'_id': id})
  .then( () => {
      res.redirect("/private/profilecars");
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/:id/deactivate", (req, res, next) => {


});

router.get("/:id/deactivate", (req, res, next) => {


});

  




module.exports = router;