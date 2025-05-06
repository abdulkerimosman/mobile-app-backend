const mongoose = require('mongoose');
const User = require('../models/User');
const Location = require('../models/locations');
const Badge = require('../models/badges');


const user_location = async (req, res) => {
    try {
        if (!req.user || !req.user.name) {
            return res.status(401).json({ error: "Unauthorized: User is not authenticated" });
        }

        const username = req.user.name;
        const { place_id } = req.body;

        // Validate input
        if (!username || !place_id) {
            return res.status(400).json({ error: "Username and Location ID are required" });
        }

        // Convert place_id to a number
        const placeId = parseInt(place_id, 10);
        if (isNaN(placeId)) {
            return res.status(400).json({ error: "Invalid Place ID format" });
        }

        // Find the location in the database
        const location = await Location.findOne({ place_id: placeId });
        if (!location) {
            return res.status(404).json({ error: "Location not found" });
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the location is already visited
        if (user.visited_locations.includes(placeId)) {
            return res.status(400).json({ message: "Location already visited" });
        }

        // Add the location to visited locations
        user.visited_locations.push(placeId);
        
        // Fetch all badges and ensure `required_places` is included
        const allBadges = await Badge.find({}, { badge_id: 1, required_places: 1 }).lean();

        let newBadgesUnlocked = []; // Initialize newBadgesUnlocked

        for (const badge of allBadges) {
            const badgeId = Number(badge.badge_id); // Ensure badge_id is a number
            if (isNaN(badgeId)) continue; // Skip invalid badge IDs

            // Ensure `required_places` is valid
            if (!badge.required_places || !Array.isArray(badge.required_places) || badge.required_places.length === 0) {
                console.error(` Badge ${badgeId} is missing required_places!`);
                continue;
            }

            // Convert `required_places` and `visited_locations` to numbers
            const requiredPlaces = badge.required_places.map(Number).filter(num => !isNaN(num));
            const visitedPlaces = user.visited_locations.map(Number);

            // Ensure badge unlock condition is met
            let qualifies = requiredPlaces.length > 0 && requiredPlaces.every(place => visitedPlaces.includes(place));

            if (qualifies && !user.unlocked_badges.includes(badge._id.toString())) {
                user.unlocked_badges.push(badge._id.toString());
                newBadgesUnlocked.push(badgeId);
                console.log(`Badge ${badgeId} UNLOCKED!`);
            }
        }


        await user.save();

        res.status(200).json({
            success: true,
            message: "Location added to visited locations",
            visited_locations: user.visited_locations,
            newly_unlocked_badges: newBadgesUnlocked,
            total_unlocked_badges: user.unlocked_badges
        });

    } catch (error) {
        console.error("Error adding visited location:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { user_location };
