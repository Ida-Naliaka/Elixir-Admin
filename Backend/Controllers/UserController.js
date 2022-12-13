const User = require("../Models/UserModel");
const Admin= require("../Models/AdminModel")
const bcrypt= require('bcryptjs')
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./VerifyToken");
const expressAsyncHandler= require('express-async-handler');
const router = require("express").Router();

//UPDATE
const updateUser = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(password, 8);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE User
const deleteUser = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE ADMIN
const deleteAdmin = expressAsyncHandler(async(req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
const getUser = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
const getUsers = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
const getUserStats = expressAsyncHandler(async(req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

const updateAdmin= expressAsyncHandler(async(req, res)=>{
  const {userId, name, email, phone, location}= req.body;
  
  if(!userId ||!name ||!email || !phoneNumber || !location) {
  res.status(400);
  throw new Error('Please provide details to update');
}
const updatedUser= await Admin.findByIdAndUpdate({userId}, {
  name:name,
  email:email,
  phone:phone,
  location:location
}, {new:true});
if (updatedUser) {
  res.status(201).json(updatedUser);
} else{
  res.status(400);
  throw new Error('Could not Update User');
}
})


module.exports = {updateUser, deleteUser, deleteAdmin, getUser, getUsers, getUserStats, updateAdmin };