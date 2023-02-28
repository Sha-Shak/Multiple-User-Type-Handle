const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
});

const LawyerSchema = new Schema({
  licenseNo: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
const Lawyer = User.discriminator("Lawyer", LawyerSchema);
module.exports = User;
