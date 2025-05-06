const User = require('../models/User');
const Avatar = require('../models/avatars');

// Get User's Avatar
const get_user_avatar = async (req, res) => {
    const username = req.user.name; // Extract username from token

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const user = await User.findOne({ username }).populate("avatar");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            avatar: user.avatar ? user.avatar.image : null,
            color: user.avatar ? user.avatar.color : null
        });
    } catch (error) {
        console.error("Server Error [get_user_avatar]:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update User's Avatar Based on Color
const update_user_avatar = async (req, res) => {
    const username = req.user.name;
    const { color } = req.body; // Color instead of avatarId

    if (!username || !color) {
        return res.status(400).json({ error: "Username and color are required" });
    }

    try {
        // Normalize color (convert to uppercase)
        const normalizedColor = color.toUpperCase(); 

        // Find the matching Avatar by color (case-insensitive)
        const avatar = await Avatar.findOne({ color: { $regex: new RegExp("^" + normalizedColor + "$", "i") } });

        if (!avatar) {
            return res.status(400).json({ error: "Invalid color selection" });
        }

        // Update User's Avatar
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { avatar: avatar._id }, // Store Avatar ID in the User schema
            { new: true }
        ).populate("avatar");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Avatar updated successfully",
            avatar: updatedUser.avatar.image,
            color: updatedUser.avatar.color
        });
    } catch (error) {
        console.error("Server Error [update_user_avatar]:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { get_user_avatar, update_user_avatar };
