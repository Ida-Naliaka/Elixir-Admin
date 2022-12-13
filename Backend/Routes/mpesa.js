const express = require('express');

const router = express.Router();

//controllers
const mpesa = require('../Controllers/lipanampesa');

//route to get the auth token
router.route('/get-auth-token').get(mpesa.getOAuthToken);

//lipa na mpesa online 
router.route('/lipa-na-mpesa').post (mpesa.lipaNaMpesaOnline);

//callback url
router.route('/lipa-na-mpesa-callback').post(mpesa.lipaNaMpesaOnlineCallback);

module.exports = router;