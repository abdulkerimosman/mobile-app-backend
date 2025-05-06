const router = require('express').Router();

// Controllers
const { register, login } = require("../controllers/register_login_controller");
const { location } = require("../controllers/location_controller");
const { leaders } = require("../controllers/leaderboard_controller");
const { get_points, update_points } = require("../controllers/point_controller");
const { get_level, update_level } = require("../controllers/level_controller");
const { getAllBadgesForUser } = require("../controllers/badge_controller");
const { user_location } = require("../controllers/user_location_controller");
const { get_question,answer } = require("../controllers/question_controller");
const { guide } = require("../controllers/guide_controller");
const { get_user_avatar, update_user_avatar } = require('../controllers/3d_controller');
const { get_rank } = require('../controllers/rank_controller');

//Middlewares
const Validation = require('../middlewares/validation');
const validation = new Validation();
const User = require('../models/User'); // Import the User model directly
const auth = require("../middlewares/auth")

//Routes
  // Registration Route
router.post('/register', validation.add_user, register);

  // Login Route
router.post('/login', login);

  // Location Route
router.get('/location', location)

  // Point Route
router.put('/point',auth.tokenCheck, update_points)
router.get('/point',auth.tokenCheck, get_points)



  // Level Route
router.put('/level', auth.tokenCheck, update_level)
router.get('/level', auth.tokenCheck, get_level)

  // Badges Route
router.get('/badge', auth.tokenCheck, getAllBadgesForUser)

  // User Location Route
router.post('/user_location',auth.tokenCheck,user_location)

  // Leader Route
router.get('/leaders', leaders)

  // Questions Route
router.get('/question/:place_id', get_question)
router.post('/answer', auth.tokenCheck, answer)

  // Guide Route
router.get('/guide', guide)

  // User Avatar Color

router.get('/model_color', auth.tokenCheck, get_user_avatar);
router.put('/model_color', auth.tokenCheck, update_user_avatar);

  // Rank

router.get('/rank', auth.tokenCheck,get_rank)


module.exports = router;
