const path = require("path");
const fs = require("fs/promises");

const Jimp = require('jimp');

const { User } = require("../../models");

module.exports = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const avatarName = `${_id}-${originalname}`;
  const resultUpload = path.join("public", "avatars", avatarName);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;
    avatar
    .autocrop()
    .cover( 250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE, )
    .write(resultUpload);
  });

  try {
    await fs.rename(tempUpload, resultUpload);
    await User.findOneAndUpdate({ _id }, { avatarURL:  resultUpload}, { new: true });

    res.status(200).json({
      status: "Success",
      avatarURL: resultUpload,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};
