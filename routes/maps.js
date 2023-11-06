const express = require('express');
const router = express.Router();
const maps = require('../controllers/maps');
const globalExceptionHandler = require('../middlewares/globalExceptionHandler');
router.use(globalExceptionHandler);

router.get('/', maps.getMaps);
router.post('/', maps.createMap);
router.get('/:mapsId', maps.getMapById);
router.put('/:mapsId', maps.updateMapById);
router.delete('/:mapsId', maps.deleteMapById);
router.get('/locations/:id', maps.getSortedLocations);



module.exports = router;