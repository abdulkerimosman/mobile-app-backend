const User = require('../models/User');
const Location = require('../models/locations');


const get_points = async (req, res) => {
  const username = req.user.name;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ fullname: user.fullname, points: user.points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const update_points = async (req, res) => {
  const username = req.user.name;
  const { place_id } = req.body;
  
  if (!username || !place_id) {
    return res.status(400).json({ error: "username and points are required" });
  }
    
  
  try {
    // Find the location by place_id
    const location = await Location.findOne({ place_id: Number(place_id) });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $inc: { points: location.place_score } },  // Increase points by place_score
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ 
      fullname: updatedUser.fullname, 
      updated_points: updatedUser.points,
      added_points: location.place_score,
      message: `You visited ${location.place_name} and earned ${location.place_score} points!` 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { get_points, update_points };
