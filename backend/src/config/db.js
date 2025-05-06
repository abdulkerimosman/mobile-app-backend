const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', true);
mongoose.set('debug', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 15000
        });
        console.log("MongoDB Connected to Atlas...");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        throw new Error('Failed to connect to MongoDB');
    }
};

module.exports = connectDB;
