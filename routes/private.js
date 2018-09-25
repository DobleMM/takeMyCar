const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const flash = require('connect-flash')
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');


router.get("/profile", ensureLoggedIn("/auth/login"), (req, res, next) => {
    res.render("private/profile", { "message": req.flash("error"), user:req.user}) 
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
    res.redirect("/private/ownerlist")
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/addcar", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("private/addcar", { "message": req.flash("error")}) 
});

router.get("/ownerlist", ensureLoggedIn(), (req, res, next) => {
  id = req.session.passport.user
  Car.find({owner:id})
  .then( cars => {
    res.render("private/ownerlist", {cars});
  })
})

router.post("/ownerlist", ensureLoggedIn(),  uploadCloud.single('photo'), (req, res, next) => {
  console.log(req.file)
  const owner = req.session.passport.user;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const imgPath = req.file.url;
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
    imgPath, 
    latitude,
    longitude
  });

  newCar.save()
  .then(() => {
    res.redirect("/private/ownerlist");
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/:id/delete-car", (req, res, next) => {
  id = req.params.id
  Car.findOneAndRemove({'_id': id})
  .then( () => {
      res.redirect("/private/ownerlist");
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong" });
  })
})

router.get("/:_id/reserve", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Car.findByIdAndUpdate(req.params._id, {available: false})
  .then( car => {
    console.log("hola")
  res.redirect("/private/profile", car)
  });
})


router.get("/:id/deactivate", (req, res, next) => {


});

router.get("/:id/deactivate", (req, res, next) => {


});

  




module.exports = router;