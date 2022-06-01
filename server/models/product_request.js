const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductRequestSchema = new Schema({
  id: String,
  emp_id: String,
  quantity: Number,
  request_type:String
});

module.exports = mongoose.model("product_request", ProductRequestSchema);
