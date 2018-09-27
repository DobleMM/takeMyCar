
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({

  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  rider: { type: Schema.Types.ObjectId, ref: 'User' },
  km: String,
  cost: String,

})

rideSchema.set('timestamps', true);

const ride = mongoose.model( 'ride', rideSchema);
module.exports = ride;



