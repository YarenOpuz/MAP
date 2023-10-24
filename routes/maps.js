const express = require('express');
const router = express.Router();
const Maps = require('../models/Maps');
const {registerValidation} = require('../validation');

router.get('/',async(req,res)=>{
  try{
    const maps = await Maps.find();
    res.json(maps);
  } catch(error){
    res.json({message:error})
  }
});

router.post('/', async(req,res)=>{
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const maps = new Maps({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    color: req.body.color
  });
  try {
    const savedMaps = await maps.save();
    res.send(savedMaps)
  } catch (error) {
    res.status(400).send(error)
  }
});

router.get('/:mapsId',async(req,res)=>{
  try{
    const maps = await Maps.findById(req.params.mapsId);
    res.send(maps);
  } catch(error){
    res.status(400).send(error);
  }
});

router.put('/:mapsId',async(req,res)=>{
  try{
    const updatedMaps = await Maps.updateOne(
      {_id:req.params.mapsId},
      {$set:{name: req.body.name,
       latitude: req.body.latitude,
       longitude: req.body.longitude,
       color: req.body.color
      }}
    );
    res.send(updatedMaps);
  } catch(error){
    res.status(400).send(error);
  }
});

router.delete('/:mapsId',async(req,res)=>{
  try{
    const removedMaps = await Maps.deleteOne({_id: req.params.mapsId});
    res.send(removedMaps);
  } catch (error){
    res.status(400).send(error);
  }
});

router.get("/locations/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const targetLocation = await Maps.findById(id);

    if (!targetLocation) {
      return res.status(404).json({ message: "Belirtilen ID ile konum bulunamadı" });
    }

    const allLocations = await Maps.find({
      _id: { $ne: id },
    });

    const sortedLocations = allLocations.sort((a, b) => {
      
      const distanceToA = Math.sqrt(
        (a.latitude - targetLocation.latitude) ** 2 + (a.longitude - targetLocation.longitude) ** 2
      );
      const distanceToB = Math.sqrt(
        (b.latitude - targetLocation.latitude) ** 2 + (b.longitude - targetLocation.longitude) ** 2
      );

      return distanceToA - distanceToB;
    });

    res.json(sortedLocations);
  } catch (error) {
    return res.status(500).json({ message: "Bir hata oluştu", error: error.message });
  }
});


module.exports = router;