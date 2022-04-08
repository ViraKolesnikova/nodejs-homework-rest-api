const express = require("express");
const router = express.Router();

const { users } = require('../../controllers');
const { wrapper, authMiddleware } = require('../../middlewares');

router.post('/register', wrapper(users.register));

router.post('/login', wrapper(users.login));

router.get('/logout', authMiddleware, wrapper(users.logout));

router.get('/current', authMiddleware, wrapper(users.getCurrentUser));

router.patch('/', authMiddleware, wrapper(users.updateSubscription))

module.exports = router;
