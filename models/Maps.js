const mongoose = require('mongoose');



const LocationsSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    default: 0,
    required: true,
  },
  longitude: {
    type: Number,
    default: 0,
    required: true,
  }
});


const MapsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  locations: {
    type:  LocationsSchema 
  },

  

  color: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Maps', MapsSchema);
