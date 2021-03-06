const express = require("express");
const passport = require('passport');
const axios = require('axios');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const Ride = require("../models/Ride");
const flash = require('connect-flash')
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');


router.get("/profile", ensureLoggedIn("/auth/login"), (req, res, next) => {
  id = req.user.id
  User.findById(id)
  .then (prof => {
    res.render("private/profile", {prof,user:req.user})   
  })
  .catch(err => {
   console.log(err);
  })
});

router.get("/:id/editcar", ensureLoggedIn("/auth/login"), (req, res, next) => {
  id = req.params.id
  Car.findById(id)
  .then( car => {
    console.log(car)
    res.render("private/editcar", {car, id, user:req.user});
  })
});

router.post("/:id/editcar", ensureLoggedIn("/auth/login"),  (req, res, next) => {
  id = req.params.id
  console.log(req.params.id)
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const cost = req.body.cost;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  let available;
  (req.body.available == 'on') ? available = true : available = false;

  Car.findByIdAndUpdate(id, {year, carMake, model, cost, km, latitude, longitude, available})
  .then(() => {
    res.redirect("/private/ownerlist")
  })
  .catch(err => {
    res.render("private/profile", { message: "Something went wrong", user:req.user });
  })
})

router.get("/addcar", ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render("private/addcar", { "message": req.flash("error"), user:req.user}) 
});

router.get("/ownerlist", ensureLoggedIn("/auth/login"), (req, res, next) => {
  id = req.session.passport.user
  Car.find({owner:id})
  .then( cars => {
    res.render("private/ownerlist", {cars, user:req.user});
  })
})

router.post("/ownerlist", ensureLoggedIn(),  uploadCloud.single('photo'), (req, res, next) => {
  const owner = req.session.passport.user;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const cost = req.body.cost;
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
    cost,
    available,
    imgPath, 
    latitude,
    longitude
  });

  newCar.save()
  .then(()=>{
    id = req.session.passport.user
    User.findByIdAndUpdate(id, {isOwner:true})
  })
  .then(() => {
    res.redirect("/private/ownerlist");
  })
  .catch(err => {
    res.rendirect("private/profile");
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

router.get("/carlist/coords", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Car.findByIdAndUpdate(req.params._id, {available: false})
  .then( car => {
  res.redirect("/private/profile", car)
  });
})




router.post("/reserve/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  console.log(req.body)
  carId = req.params.id
  ride = {
  km: req.body.km,
  cost: req.body.cost,
  car:req.params.id,
  rider: req.user.id,
  }
  Car.findByIdAndUpdate(carId, {available: false})
  .then( () => {
    Ride.create(ride).then( (ride) =>{
      res.redirect("/private/profile")
     })
  }) 
});


router.get("/rides", ensureLoggedIn("/auth/login"), (req, res, next) => {
  id = req.user._id
  console.log(id)

  Promise.all([
    Ride.find({rider: id}),
    Car.find({owner: id})
  ])
  .then( ([rides, cars]) => {

    carIds = cars.map(e => {
      return e._id;
    })

    Promise.all(carIds.map(e => {
      return Ride.find({car: e})
    }))
    .then(function(drives)
    {
      drive = drives[0];
      let ridesStr = JSON.stringify(rides)
      let drivesStr = JSON.stringify(drive)
      res.render("private/rides", {drive, rides, user:req.user,ridesStr, drivesStr })
    })
    })
})

module.exports = router;