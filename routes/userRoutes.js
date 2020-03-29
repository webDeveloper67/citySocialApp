const express = require('express');
const userCont = require('./../controllers/userController');
const router = express.Router();

router.param('userID', userCont.userByID);

module.exports = router;
