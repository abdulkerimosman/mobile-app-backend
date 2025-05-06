const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
  guide_name: {
    type: String,
    required: true
  },
  places_to_visit: {
    type: [Number],
    required: true
  },
  area_id: {
    type: Number,
    required: true
  },
  languages_spoken: {
    type: [String],
    required: true
  },
  years_of_experience: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  nationality: {
    type: String,
    required: true
  },
  lat: {
    type: Number, // Now stored as a numeric value
    required: true
  },
  lng: {
    type: Number, // Now stored as a numeric value
    required: true
  },
  path: {
    type: String, // Added field for the guide's image path
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Guide', GuideSchema);
