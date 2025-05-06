Report: Explanation of the Endpoints


  // Registration Route 
router.post('/register', validation.add_user, register);
    -> Required in request body: fullname, email, username, password, confirmed_password
    

  // Login Route
router.post('/login', login);
    -> Required in request body: username, password

  // Location Route
router.get('/location', location)
    -> Required in request body: nothing 

  // Point Route
router.put('/point',auth.tokenCheck, update_points)
    -> Required in request body: place_id
router.get('/point',auth.tokenCheck, get_points)
    -> Required in request body: nothing, token will be used 

  // Level Route
router.put('/level', auth.tokenCheck, update_level)
    -> Required in request body: place_id
router.get('/level', auth.tokenCheck, get_level)
    -> Required in request body: nothing

  // Badges Route
router.get('/badge', auth.tokenCheck, getAllBadgesForUser)
    -> Required in request body: nothing

  // User Location Route
router.post('/user_location',auth.tokenCheck,user_location)
    -> Required in request body: place_id

  // Leader Route
router.get('/leaders', leaders)
    -> Required in request body: nothing

  // Questions Route
router.get('/question/:place_id', get_question)
    -> Required in request body: nothing, place_id used in params instead.
router.post('/answer', auth.tokenCheck, answer)
    -> Required in request body: questions_id, user_answer

  // Guide Route
router.get('/guide', guide)
    -> Required in request body: nothing

  // User Avatar Color

router.get('/model_color', auth.tokenCheck, get_user_avatar);
    -> Required in request body: nothing, token used instead
router.put('/model_color', auth.tokenCheck, update_user_avatar);
    -> Required in request body: color

  // Rank
router.get('/rank', auth.tokenCheck,get_rank);
    -> Required in request body: nothing, token used instead
