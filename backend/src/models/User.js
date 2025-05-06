const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    unlocked_badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }], // Reference to Badge model 
    visited_locations: [{ type: Number }], // Reference to place_id in Location 
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

