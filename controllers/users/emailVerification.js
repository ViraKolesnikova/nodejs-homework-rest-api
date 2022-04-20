const { User } = require("../../models");
const { NotFound } = require("http-errors");

module.exports = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound("Verification has already been passed");
  }

  await User.findByIdAndUpdate(
    { _id: user._id },
    { verified: true, verificationToken: null },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    message: 'Verification is successful'
  })
};
