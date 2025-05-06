const Leaders = require('../models/User');

const leaders = async (req, res) => {
  try {
    const leaders = await Leaders.find({})
      .select("fullname points avatar")
      .populate('avatar', 'image')
      .sort({ points: -1 });
      
    const formattedLeaders = leaders.map(leader => ({
      fullname: leader.fullname,
      points: leader.points,
      avatarUrl: leader.avatar?.image ? `http://10.0.2.2:5000${leader.avatar.image}` : ''
    }));

    res.status(200).json(formattedLeaders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { leaders }