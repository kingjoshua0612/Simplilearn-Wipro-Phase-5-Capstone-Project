const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// id is the name itself -- products are unique
const CartProductSchema = new Schema({
  id: String, 
  quantity: Number,
  total: Number
});

module.exports = mongoose.model("CartProducts", CartProductSchema);
