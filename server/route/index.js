const registerRoute = require('../route/route.register');
const loginRoute = require('../route/route.login');

const express=require('express');

var router = express.Router();

router.use('/register',registerRoute)
router.use('/login',loginRoute)

module.exports = router;