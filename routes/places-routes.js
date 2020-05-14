const express = require('express');

const router = express.Router();
const placesController = require('../models/places-controller');

router.get('/:pid', placesController.getPlaceById);
router.get('/user/:uid', placesController.getPlaceByUser);
    
//paso27

router.post('/', placesController.createPlace);
router.patch('/:pid', placesController.updatePlace);

router.delete('/:pid', placesController.deletePlace);
module.exports = router;
