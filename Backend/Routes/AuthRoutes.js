const express= require ('express');
const { registerUser, authUser, verifyUser, registerAdmin, LoginAdmin, verifyAdmin } = require('../Controllers/AuthController');
const router= express.Router();


router.route("/register").post(registerUser);
router.route("/registeradmin").post(registerAdmin)
router.route("/login").post(authUser);
router.route("/loginadmin").post(LoginAdmin);
router.route("/:confirmationCode").get(verifyUser);
router.route("/admin/:confirmationCode").get(verifyAdmin);


module.exports=router;