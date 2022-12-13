const express= require ('express');
const { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getPopularProducts, allProducts }= require ("../Controllers/ProductController");
const { verifyTokenAndAdmin } = require('../Controllers/VerifyToken');
const router= express.Router();

router.route("/newproduct").post(verifyTokenAndAdmin, createProduct);
router.route("/:id").put(verifyTokenAndAdmin, updateProduct);
router.route("/:id").delete(verifyTokenAndAdmin, deleteProduct);
router.route("/find/:id").get(getProduct);
router.route("/").get(getAllProducts);
router.route("/newOrder").get(allProducts);
router.route("/getPopularProducts").get(getPopularProducts);

module.exports=router;