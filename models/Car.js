
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/User");

const carSchema = new Schema({
  
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  carMake: {type:String, required: true},
  model: {type:String, required: true},
  year: {type: Number, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true}

});

carSchema.set('timestamps', true);

const Car = mongoose.model('car', carSchema);

module.exports = Car;

