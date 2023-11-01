const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');
const globalExceptionHandler = require('../middlewares/globalExceptionHandler');
router.use(globalExceptionHandler);

router.get('/', mapsController.getMaps);
router.post('/', mapsController.createMap);
router.get('/:mapsId', mapsController.getMapById);
router.put('/:mapsId', mapsController.updateMapById);
router.delete('/:mapsId', mapsController.deleteMapById);
router.get('/locations/:id', mapsController.getSortedLocations);



module.exports = router;