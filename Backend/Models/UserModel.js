const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: {type: String, required: true},
    city: {type: String, required: true},
    confirmationCode: {type: String, required: true},
    status: { type: String, enum: ['Pending', 'Active'],default: 'Pending'},
    pic: {type: String,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
  },
  { timestamps: true,
    toJSON: {virtuals: true} }
);
const User=mongoose.model("User", UserSchema);

module.exports = User;