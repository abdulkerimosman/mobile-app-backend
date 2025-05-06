const User = require('../models/User');

const get_level = async (req, res) => {
  const username = req.user.name;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ level: user.level });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const update_level = async (req, res) => {
  const username = req.user.name;
  const { level } = req.body;
  if (!username || level === undefined) {
    return res.status(400).json({ error: "username and level are required" });
  }
  
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $inc: { level } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ level: updatedUser.level });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { get_level, update_level };
