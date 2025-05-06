const User = require('../models/User');
const Badge = require('../models/badges');


const getAllBadgesForUser = async (req,res) => {
  const username = req.user.name;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  try {
      const user = await User.findOne({ username }).populate('unlocked_badges');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const allBadges = await Badge.find({});

      const badgesWithStatus = allBadges.map(badge => {
          const isUnlocked = user.unlocked_badges.some(unlockedBadge => unlockedBadge._id.equals(badge._id));
          return {
              _id: badge._id,
              badge_name: badge.badge_name,
              badge_img: isUnlocked ? badge.badge_img_color : badge.badge_img_grey,
              badge_about: badge.badge_about,
              isUnlocked
          };
      });

      return res.status(200).json({ success: true, badges: badgesWithStatus });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });  }
};


module.exports = { getAllBadgesForUser }