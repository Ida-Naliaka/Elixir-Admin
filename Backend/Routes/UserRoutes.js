const express= require ('express');
const { updateUser, getUsers, getUser, deleteUser, getUserStats, updateAdmin, deleteAdmin } = require('../Controllers/UserController');
const { verifyTokenAndAdmin } = require('../Controllers/VerifyToken');
const router= express.Router();

router.route("/").get(getUsers);
router.route("/find/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/admin/:id").delete(deleteAdmin);
router.route("/stats").get(getUserStats);
router.route("/updateadmin").put(updateAdmin);

module.exports=router;


