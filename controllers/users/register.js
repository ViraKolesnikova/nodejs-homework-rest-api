const { BadRequest, Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');
const { userValidation } = require('../../middlewares')

module.exports = async (req, res) => {
  const validationResult = userValidation(req.body);

  if(validationResult.error) {
    throw new BadRequest(validationResult.error.details);
  }

  const { email, password } = req.body;
  const user = await User.findOne({email});

  if (user) {
    throw new Conflict('This email is already used')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url( email, {protocol: 'https', s: '200'});
  const newUser = await User.create({email, password: hashPassword, avatarURL});

  res.status(201).json({
    status: "Created",
    user: {
      email: newUser.email,
      subscription : newUser.subscription,
      avatarURL: newUser.avatarURL
     }
  })
}
