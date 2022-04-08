const { contactValidation, favoriteValidation, userValidation } = require('./validation');
const wrapper = require('./wrapper');
const authMiddleware = require('./authMiddleware');

module.exports = {
  contactValidation,
  favoriteValidation,
  userValidation,
  wrapper,
  authMiddleware
}
