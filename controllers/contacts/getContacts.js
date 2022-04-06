const { BadRequest } = require('http-errors');

const {Contact} = require('../../models');

module.exports = async (req, res, next) => {
  const { _id } = req.user;
  const {page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;

  const query = favorite ? {owner: _id, favorite: true} : {owner: _id}
  const contacts = await Contact.find(query, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");

  if (!contacts) {
    throw new BadRequest(`Bad request`);
  }

  res.json({ status: "success", data: contacts });
}

