const { BadRequest } = require('http-errors');

const { User } = require('../../models');

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (subscription !== 'pro' && subscription !== 'business') {
    throw new BadRequest("Bad request");
  }

  const updetedSubscription = await User.findOneAndUpdate({_id}, {subscription}, {new: true});
  res.status(200).json({
    status: "Success",
    user : {
      email: req.user.email,
      subscription: updetedSubscription.subscription,
    }
  })
}