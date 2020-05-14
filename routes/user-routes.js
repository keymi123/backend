const express = require('express');


const router = express.Router();


const userController = require('../models/users-controller');


router.get('/', userController.getUsers);
router.post('/sinup',userController.singup);
router.post('/login',userController.login);

module.exports = router;