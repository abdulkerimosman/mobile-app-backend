const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  area_id: { type: Number, required: true },
  place_id: { type: Number, required: true, unique: true }, 
  place_name: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  area_name: { type: String, required: true },
  image_path: { type: String, required: true },
  ai_image_path: { type: String, required: true },
  place_score: { type: Number, required: true },  
  place_categori: { type: String, required: true },
  about: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
