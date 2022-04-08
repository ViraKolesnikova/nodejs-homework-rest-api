const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

module.exports = async (req, res) => {
const { _id } = req.user;
const user = await User.findById(_id);

 if (!user) {
  throw new Unauthorized("Not authorized");
 }

 res.status(200).json({
   user: {
     email: user.email,
     subscription: user.subscription
   }
 })
}
