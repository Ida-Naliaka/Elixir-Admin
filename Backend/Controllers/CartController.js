const Cart = require("../Models/CartModel");
const expressAsyncHandler= require('express-async-handler');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");

const router = require("express").Router();

//CREATE
const createCart = expressAsyncHandler(verifyToken, async(req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
const updateCart = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
const deleteCart = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
const getUserCart = expressAsyncHandler(verifyTokenAndAuthorization, async(req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
const getAllCarts = expressAsyncHandler(verifyTokenAndAdmin, async(req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {createCart, updateCart, deleteCart, getUserCart, getAllCarts};