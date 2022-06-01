const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// id is the name itself -- products are unique
const ProductSchema = new Schema({
  id: String, 
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("Products", ProductSchema);
