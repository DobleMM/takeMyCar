const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/profile", (req, res, next) => {
  res.render("private/profile", { "message": req.flash("error") });
});


router.post("/profile", (req, res, next) => {
  const owner = req.body._id;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const startDate = req.body.km;
  const endDate = req.body.km;

    const newCar = new Car({
      owner,
      year,
      carMake,
      model,
      km,
      startDate,
      endDate

    });

    newCar.save()
    .then(() => {
      res.redirect("/profilecars");
    })
    .catch(err => {
      res.render("/profile", { message: "Something went wrong" });
    })
  })



module.exports = router;