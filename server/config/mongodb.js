const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
exports.connect = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
