const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};
