const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questions: {
    type: String,
    required: true
  },
  questions_id: {
    type: Number,
    required: true,
    unique: true
  },
  questions_place_id: {
    type: Number,  // Ensure it's stored as a number
    required: true,
    index: true  // Optimized for queries
  },
  options: {
    type: [String],
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  questions_score: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema,"questions_answers");

module.exports = Question;
