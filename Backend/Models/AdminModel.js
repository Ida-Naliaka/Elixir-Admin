const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, default: false},
    phone: {type: String, required: true},
    title: {type: String, required: true},
    location: {type: String, required: true},
    confirmationCode: {type: String, required: true},
    status: { type: String, enum: ['Pending', 'Active'],default: 'Pending'},
    pic: {type: String,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
  },
  { timestamps: true,
    toJSON: {virtuals: true} }
);
const Admin= mongoose.model("Admin", AdminSchema);

module.exports = Admin;