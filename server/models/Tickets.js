const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  id: String,
  description: String
});

module.exports = mongoose.model("Tickets", TicketSchema);
