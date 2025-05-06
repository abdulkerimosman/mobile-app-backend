const User = require('../models/User');

const get_rank = async (req, res) => {
  const username = req.user.name;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const users = await User.find({}, "fullname points").sort({ points: -1 });

    // Kullanıcının sıralamasını bul
    const rank = users.findIndex(u => u._id.toString() === user._id.toString()) + 1;

    // Ziyaret edilen lokasyon sayısını al
    const visitedCount = user.visited_locations.length;

    // Rank Name belirleme
    const rankNames = ["Çırak", "Gezgin", "Kâşif", "Usta Gezgin", "Efsane"];
    const rankIndex = Math.min(Math.floor(user.points / 100), rankNames.length - 1);
    const rank_name = rankNames[rankIndex];

    res.json({
      fullname: user.fullname,
      points: user.points,
      rank,
      rank_name,
      visited_locations: visitedCount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { get_rank }