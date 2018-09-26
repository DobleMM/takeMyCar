// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Car = require("../models/Car");
const Ride = require("../models/Ride");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/takemycar', {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [{
    username: "cat",
    email: "cat@cato.meow",
    password: bcrypt.hashSync("cat", bcrypt.genSaltSync(bcryptSalt)),
    isOwner: true,
    isDriver: true,
    imgPath: "http://res.cloudinary.com/dr1df4kwt/image/upload/v1537899164/folder-name/hqdefault.jpg.jpg",
  },
  {
    username: "driver",
    email: "driver@drive.com",
    password: bcrypt.hashSync("driver", bcrypt.genSaltSync(bcryptSalt)),
    isOwner: false,
    isDriver: true,
    imgPath: "http://res.cloudinary.com/dr1df4kwt/image/upload/v1537961322/folder-name/ClVbjlG-_400x400.jpg.jpg",
  }
]


// let rides = [
//   {
//     car: { type: Schema.Types.ObjectId, ref: 'Car' },
//     driver: { type: Schema.Types.ObjectId, ref: 'User' },
//     pickupTime: 2018-09-25,
//     finishTime: 2018-09-26,
//     kmAtBeggining: 100,
//     kmAtFinish: 120,
//   }
// ]

User.collection.drop()


users.forEach(p => {
  let pr = new User(p);
  pr.save((err, usr) => {
    if (err) throw err;
    let car = new Car({
      owner: usr._id,
      carMake: "lightining",
      model: "mcqueen",
      year: 1999,
      km: 100,
      available: true,
      latitude: 40.40450221082866,
      longitude: -3.695188572460893,
      imgPath: "http://res.cloudinary.com/dr1df4kwt/image/upload/v1537960754/folder-name/LightningMcQueenCars3.png.png",
      cost: 10
    })
    console.log(`Utente guardado ${usr.username}`);
    car.save((err, c) => {
      let ride = new Ride({
        car: c._id,
        driver: usr._id,
        pickupTime: new Date(),
        finishTime: new Date(),
        kmAtBeggining: 100,
        kmAtFinish: 120,
      })
      console.log(ride)
       ride.save((err)=>{
        console.log(err)
      })
    })
  })
})




// User.create(users).then(usersCreated => {
//     let car = new Car({
//       owner: usersCreated[0]._id,
//       carMake: "lightining",
//       model: "mcqueen",
//       year: 1999,
//       km: 100,
//       available: true,
//       latitude: 40.40450221082866,
//       longitude: -3.695188572460893,
//       imgPath: "http://res.cloudinary.com/dr1df4kwt/image/upload/v1537960754/folder-name/LightningMcQueenCars3.png.png",
//     })


//     car.save((err) => console.log('err'))
//   })







  // Car.deleteMany()
  // .then(() => {
  //   return Car.new(cars)
  // })
  // .then(carsCreated => {
  //   console.log(`${carsCreated.length} users created with the following id:`);
  //   console.log(carsCreated.map(u => u._id));
  // })
  // Ride.deleteMany()
  // .then(() => {
  //   return Ride.create(rides)
  // })
  // .then(ridesCreated => {
  //   console.log(`${ridesCreated.length} users created with the following id:`);
  //   console.log(ridesCreated.map(u => u._id));
  // })
 