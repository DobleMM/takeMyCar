
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  username : {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  isOwner: { type: Boolean, default: false },
  isDriver: { type: Boolean, default: true },
  licensePhoto: {
    licensePath: String,
  },
  paymentDetails: {
    cardName: String,
    expirationDate: Date,
    creditCard: Number,
    securityCode: Number,
    billingAddress: String,
  }

})

userSchema.set('timestamps', true);

const user = mongoose.model('user', userSchema);
module.exports = user;

