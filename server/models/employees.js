const mongoose = require("mongoose");
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    changedPassword: {
        type: Boolean,
        default: 0
    }
});

module.exports = mongoose.model("employees", EmployeeSchema);
