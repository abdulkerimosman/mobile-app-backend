const User = require('../models/User');
const { createToken } = require('../middlewares/auth');
const Avatar = require('../models/avatars');


const register = async (req, res) => {
    const { fullname, email, username, password, confirmed_password } = req.body;

    try {
        let user = await User.findOne({ email }).lean();
        if (user) {
            console.log('User already exists - [register]')
            return res.status(400).json({ error: "User already exists" });
        }

        

        if (password !== confirmed_password) {
            console.log('Passwords do not match - [register]')
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Finds the first avatar in the collection
        const defaultAvatar = await Avatar.findOne(); 

        

        user = new User({ fullname, email, username, password, avatar: defaultAvatar ? defaultAvatar._id : null });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username }).select("+password");
        if (!user) {
            console.log('Invalid credentials - [login]')
            return res.status(400).json({ error: "Invalid credentials" });
        }

        console.log("User found!"); 

        if (!user.password) {
            console.error("Error: Password field is missing in the database![login]");
            return res.status(500).json({ error: "Server error: Password field is missing" });
        }

        const isMatch = await user.matchPassword(password);

        console.log("Password Match!");
        
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        return createToken(req, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { register, login }
