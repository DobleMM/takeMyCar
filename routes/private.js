const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Car = require("../models/Car");
const session    = require("express-session");


router.get("/profile", (req, res, next) => {
  res.render("private/profile", { "message": req.flash("error") });
});

router.post("/profilecars", (req, res, next) => {
  const owner = req.session.passport.user;
  const year = req.body.year;
  const carMake = req.body.carMake;
  const model = req.body.model;
  const km = req.body.km;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

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
      res.render("private/profile", { message: "Something went wrong" });
    })
  })

  router.get("/profilecars", (req, res, next) => {
    res.render("private/profilecars", { "message": req.flash("error") });
  });




module.exports = router;