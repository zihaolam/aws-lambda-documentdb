const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  firstName: String,
  lastName: String,
  position: String,
  department: String,
});

const Staff = mongoose.model('Staff', staffSchema);

exports.Staff = Staff;