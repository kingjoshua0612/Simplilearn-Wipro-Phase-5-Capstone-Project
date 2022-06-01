const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  dod: String,
  phoneNumber: String,
  userAddress: String,
  password: String,
  cart: [{
    type: Schema.Types.Mixed,
    ref: "CartProducts",
    required: true
  }],
  funds: Number,
  accountNumber: String,
  locked: {
    type: Boolean,
    default: 0
  }
});

module.exports = mongoose.model("Users", UserSchema);
