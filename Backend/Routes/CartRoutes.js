const express= require ('express');
const { createCart, updateCart, deleteCart, getUserCart, getAllCarts } = require('../Controllers/CartController');
const router= express.Router();


router.route("/").post(createCart);
router.route("/:id").put(updateCart);
router.route("/:id").delete(deleteCart);
router.route("/find/:userId").get(getUserCart);
router.route("/").get(getAllCarts);


module.exports=router;