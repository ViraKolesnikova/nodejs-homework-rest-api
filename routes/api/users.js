const express = require("express");
const router = express.Router();

const { users } = require('../../controllers');
const { wrapper } = require('../../middlewares/wrapper');

router.post('/register', wrapper(users.register));

router.post('/login', wrapper(users.login))


module.exports = router;
