const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const session    = require("express-session");


router.get("/profile", (req, res, next) => {
  res.render("private/profile", { "message": req.flash("error") });
});

router.get("/profilecars", (req, res, next) => {
  Car.find({})
  .then( cars => {
    res.render("private/profilecars", {cars});
  })
  
});

router.post("/profilecars", (req, res, next) => {
  console.log(req.body)
  const owner = req.session.passport.user;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  let available;
  (req.body.available == 'on') ? available = true : available = false;

  const newCar = new Car({  
    owner,
    year,
    carMake,
    model,
    km,
    available
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