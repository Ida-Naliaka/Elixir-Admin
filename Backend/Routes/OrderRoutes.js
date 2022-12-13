const express = require("express");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrders,
  getMonthlyIncome,
} = require("../Controllers/OrderController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../Controllers/VerifyToken");
const router = express.Router();

router.route("/").post(createOrder);
router.route("/:id").put(verifyTokenAndAdmin, updateOrder);
router.route("/:id").delete(verifyTokenAndAdmin, deleteOrder);
router.route("/find/:userId").get(verifyTokenAndAuthorization, getUserOrders);
router.route("/").get(verifyTokenAndAdmin, getAllOrders);
router.route("/income").get(verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
