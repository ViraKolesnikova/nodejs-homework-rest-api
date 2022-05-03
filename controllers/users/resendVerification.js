const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { v4: uuidv4 } = require('uuid');

const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound(`User with email ${email} is not found`);
  }

  if (user.verified) {
    throw new NotFound("Verification has already been passed");
  }

  const verificationToken = uuidv4();
  await User.findByIdAndUpdate(
    { _id: user._id },
    { verificationToken },
    { new: true }
  );

  const msg = {
    to: email,
    from: 'biralara@ukr.net',
    subject: 'Email reverification',
    text: `<strong>Follow the <a href = "http://localhost:3000/api/users/verify/${verificationToken}">link </a> to verify your email.</strong>`,
    html: `<strong>Follow the <a href = "http://localhost:3000/api/users/verify/${verificationToken}">link </a> to verify your email.</strong>`,
  };
  sgMail.send(msg);

  res.status(200).json({
    status: "Success",
    message: "Verification email is sent",
  });
};
