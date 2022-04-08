const { NotFound } = require('http-errors');

const {Contact} = require('../../models')

module.exports = async (req, res, next) => {
  const ownerId = req.user._id;
  const id = req.params.contactId;
  const contactById = await Contact.findOne({_id: id, owner: ownerId});

  if (!contactById) {
    throw new NotFound(`Contact with id ${id} is not found`)
  }

  res.json({ status: "success", data: contactById });
}