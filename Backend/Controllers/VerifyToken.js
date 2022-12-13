const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Admin = require("../Models/AdminModel");
const dotenv = require("dotenv");
dotenv.config();
const expressAsyncHandler = require("express-async-handler");

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //split it and take the token
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); //return without the password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token is not valid!");
    }
  }
  if (!token) {
    res.status(401);
    throw new error("You are not authenticated!");
  }
});

const verifyTokenAndAuthorization = expressAsyncHandler(
  async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]; //split it and take the token
        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); //return without the password
        req.admin = await Admin.findById(decoded.id).select("-password");
        if (req.user._id === req.params.id || req.admin._id) {
          next();
        } else {
          res.status(403);
          throw new error("You are not allowed to do that!");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized, Token is not valid!");
      }
    }
    if (!token) {
      res.status(401);
      throw new error("You are not authenticated!");
    }
  }
);

const verifyTokenAndAdmin = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //split it and take the token
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Admin.findById(decoded.id).select("-password"); //return without the password
      if (req.user) {
        next();
      } else {
        res.status(403);
        throw new error("You are not allowed to do that!");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token is not valid!");
    }
  }
  if (!token) {
    res.status(401);
    throw new error("You are not authenticated!");
  }
});

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
