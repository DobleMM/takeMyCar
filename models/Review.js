
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

  owner: { type: Schema.Types.ObjectId, ref: 'Car' },
  driver: { type: Schema.Types.ObjectId, ref: 'Ride' },
  review: String

})

reviewSchema.set('timestamps', true);

const review = mongoose.model('review', reviewSchema);
module.exports = review;
