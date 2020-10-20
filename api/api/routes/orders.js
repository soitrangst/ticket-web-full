const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')

const Product_Controller = require("../controller/order-controller")

router.post('/',Product_Controller.create_new )
router.get('/ticket/:code',Product_Controller.get_specific )
router.get('/all',Product_Controller.get_all_order )

module.exports = router