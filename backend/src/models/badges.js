const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  badge_id: { type: String, required: true },
  badge_name: { type: String, required: true },
  badge_img_grey: { type: String, required: true },//grey version
  badge_img_color: { type: String, required: true },//colored version
  badge_about: { type: String, required: true },
  required_points: { type: Number, required: true } // Points required to unlock
}, { timestamps: true });

module.exports = mongoose.model('Badge', BadgeSchema);
