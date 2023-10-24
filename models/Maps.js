const { object, required } = require("joi");
const mongoose = require('mongoose');

const MapsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  latitude: {
    type: Number,
    default:0,
    required:true,
  },

  longitude: {
    type: Number,
    default:0,
    required:true,
  },
  
  color: {
    type: String,
    required:true,
  }
});




module.exports = mongoose.model('Maps',MapsSchema);