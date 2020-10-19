const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')

const Product_Controller = require("../controller/order-controller")

router.post('/',checkAuth,Product_Controller.create_new )
router.get('/:code',Product_Controller.get_specific )

module.exports = router