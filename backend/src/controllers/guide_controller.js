const Guide = require('../models/guides');

const guide = async (req,res) => {
  try {
    const guides = await Guide.find({});
    res.status(200).json(guides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { guide }