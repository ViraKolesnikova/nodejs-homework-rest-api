const { NotFound } = require('http-errors');

const {Contact} = require('../../models');

module.exports = async (req, res, next) => {
  const ownerId = req.user._id;
  const id = req.params.contactId;

  if(!id){
    return
  }

  const contactById = await Contact.findOneAndRemove({_id: id, owner: ownerId});

  if (!contactById) {
    throw new NotFound(`Contact with id ${id} is not found`)
  }

  res.status(200).json({ status: "success", message: "contact is deleted" });
}