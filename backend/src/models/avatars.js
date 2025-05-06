const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
    image: { type: String, required: true, unique: true }, // Path to the avatar image
    color: { type: String, required: true, unique: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Avatar', AvatarSchema);
