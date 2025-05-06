const Question = require('../models/questions');
const Location = require('../models/locations');
const User = require('../models/User');

const get_question = async (req, res) => {
    try {
        const { place_id } = req.params;

        // Convert place_id to number
        const parsedPlaceId = Number(place_id);
        if (isNaN(parsedPlaceId)) {
            return res.status(400).json({ message: "Invalid place_id. It must be a number." });
        }

        // Fetch questions ensuring correct data type
        const questions = await Question.find({ questions_place_id: parsedPlaceId }).lean();

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this location." });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Check the answer for a question
const answer = async (req, res) => {
    try {
        const { questions_id, user_answer } = req.body; // Get question ID & answer from body
        const username = req.user.name;
        if (!username) {
            return res.status(400).json({ error: "username is required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the question by its ID
        const question = await Question.findOne({ questions_id: questions_id });

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user's answer matches the correct answer
        const isCorrect = question.answer === user_answer;

        if (isCorrect) {
            // Add question score to user's points
            user.points += question.questions_score;
            await user.save();
        }

        res.status(200).json({
            correct: isCorrect,
            correct_answer: question.answer,
            updated_points: user.points,
            message: isCorrect 
                ? `Correct answer! You earned ${question.questions_score} points.` 
                : "Wrong answer, try again!"
        });

       

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { get_question, answer };
