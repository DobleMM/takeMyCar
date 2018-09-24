
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({

  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  driver: { type: Schema.Types.ObjectId, ref: 'User' },
  pickupTime: Date,
  finishTime: Date,
  kmAtBeggining: Number,
  kmAtFinish: Number,

})

rideSchema.set('timestamps', true);

const ride = mongoose.model( 'ride', rideSchema);
module.exports = ride;



