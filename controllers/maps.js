const Maps = require('../models/Maps');
const { registerValidation } = require('../middlewares/validation');
const globalExceptionHandler = require('../middlewares/globalExceptionHandler');
const lodash = require('lodash');

async function getMaps(req, res, next) {
  const { error } = globalExceptionHandler;
  const maps = await Maps.find();
  res.json(maps);
  if (error) return next(error);

}

async function createMap(req, res, next) {
  const { error } = registerValidation(req.body);
  if (error) {
    return next(error);
  } else {
    const { name, locations, color } = req.body;
    const { latitude, longitude } = locations;
    const maps = new Maps({
      name,
      locations: {
        latitude,
        longitude
      },
      color
    });
    const savedMaps = await maps.save();
    res.send(savedMaps);
  }
}
// hataaa
async function getMapById(req, res, next) {

  const maps = await Maps.findById(req.params.mapsId);
  if (!maps) {
    return next(globalExceptionHandler);
  }
  res.send(maps);
}


async function updateMapById(req, res, next) {

  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, locations, color } = req.body;
  const { mapsId } = req.params;

  const updateFields = {};

  if (name !== undefined) {
    updateFields.name = name;
  }
  if (locations) {
    if (locations.latitude !== undefined) {
      updateFields['locations.latitude'] = locations.latitude;
    }
    if (locations.longitude !== undefined) {
      updateFields['locations.longitude'] = locations.longitude;
    }
  }

  if (color !== undefined) {
    updateFields.color = color;
  }
  try {
    const updatedMaps = await Maps.updateOne({ _id: mapsId }, { $set: updateFields });
    res.send(updatedMaps);
  } catch (error) {

    next(error);
  }
}

async function deleteMapById(req, res, next) {
  try {
    const removedMaps = await Maps.deleteOne({ _id: req.params.mapsId });
    res.send(removedMaps);
  } catch (error) {

    next(error);
  }
}




// async function getSortedLocations(req, res, next) {
//   const id = req.params.id;
//   try {
//     const targetLocation = await Maps.findById(id);

//     if (!targetLocation) {
//       return res.status(404).json({ message: "Belirtilen ID ile konum bulunamadı" });
//     }

//     const allLocations = await Maps.find({
//       _id: { $ne: id },
//     });

//     const sortedLocations = allLocations.sort((a, b) => {
//       const distanceToA = Math.sqrt(
//         (a.locations.latitude - targetLocation.locations.latitude) ** 2 + (a.locations.longitude - targetLocation.locations.longitude) ** 2
//       );
//       const distanceToB = Math.sqrt(
//         (b.locations.latitude - targetLocation.locations.latitude) ** 2 + (b.locations.longitude - targetLocation.locations.longitude) ** 2
//       );

//       return distanceToA - distanceToB;
//     });

//     res.json(sortedLocations);
//   } catch (error) {
//     next(error);
//   }
// }


async function getSortedLocations(req, res, next) {
  const id = req.params.id;
  try {
    const targetLocation = await Maps.findById(id);

    if (!targetLocation) {
      return res.status(404).json({ message: "Belirtilen ID ile konum bulunamadı" });
    }

    const allLocations = await Maps.find({
      _id: { $ne: id },
    });

    const sortedLocations = lodash.sortBy(allLocations, (location) => {
      return calculateDistance(targetLocation, location);
    });

    res.json(sortedLocations);
  } catch (error) {
    next(error);
  }
}


function calculateDistance(locationA, locationB) {
  return Math.sqrt(
    (locationA.locations.latitude - locationB.locations.latitude) ** 2 +
    (locationA.locations.longitude - locationB.locations.longitude) ** 2
  );
}


module.exports = {
  getMaps,
  createMap,
  getMapById,
  updateMapById,
  deleteMapById,
  getSortedLocations,
};