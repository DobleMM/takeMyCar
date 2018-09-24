
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  
  owner: { type: Schema.Types.ObjectId, ref: 'Car' },
  year: {type: Number, required: true},
  carMake: {type:String, required: true},
  model: {type:String, required: true},
  km: {type: Number, required: true},
  available: {type: Boolean, default: false },
  availableDates: Date,

})

reviewSchema.set('timestamps', true);

const car = mongoose.model('car', carSchema);

module.exports = car;

