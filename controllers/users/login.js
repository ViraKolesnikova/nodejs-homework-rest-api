const { BadRequest, Unauthorized } = require('http-errors');
const jwt = require("jsonwebtoken");
const bcrypt =  require('bcryptjs');
const { User } = require('../../models');
const { userValidation } = require('../../middlewares/validation')

const {SECRET_KEY} = process.env;

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});

  if (!user) {
    throw new Unauthorized("Email or password is wrong")
  }
  const validationResult = userValidation(req.body);

  if(validationResult.error) {
    throw new BadRequest(validationResult.error.details);
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong")
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "2h"});
  await User.findByIdAndUpdate(user._id, {token});

  res.status(200).json({
    status: "Success",
    user: {
      email: user.email,
      subscription : user.subscription
     },
     token
  })
}
