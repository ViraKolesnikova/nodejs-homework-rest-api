const { BadRequest, NotFound } = require('http-errors');

const {Contact} = require('../../models');
const { favoriteValidation } = require('../../middlewares');

module.exports = async (req, res, next) => {
  if(req.body.favorite === undefined){
    throw new BadRequest("Missing field favorite");
  }

  const ownerId = req.user._id;
  const {favorite}= req.body;
  const id = req.params.contactId;
  const validationResult = favoriteValidation(req.body);

  if(validationResult.error){
    throw new BadRequest(validationResult.error.details);
  }

  const updatedContact = await Contact.findOneAndUpdate({_id: id, owner: ownerId}, {favorite}, {new:true});

  if (!updatedContact) {
    throw new NotFound(`Contact with id ${id} is not found`);
  }

  res.status(200).json({ status: "success", data: updatedContact });
}
