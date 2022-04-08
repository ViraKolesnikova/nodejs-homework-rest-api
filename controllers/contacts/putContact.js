const { BadRequest } = require('http-errors');

const { contactValidation } = require('../../middlewares');
const {Contact} = require('../../models');

module.exports = async (req, res, next) => {
  const ownerId = req.user._id;
  const id = req.params.contactId;
  const body = req.body;

  if(!id || !body){
    throw new BadRequest("Bad request");
  }

  const validationResult = contactValidation(body);

  if(validationResult.error){
    throw new BadRequest(validationResult.error.details);
  }

  const updatedContact = await Contact.findOneAndUpdate({_id: id, owner: ownerId}, body, {new:true});
  res.status(200).json({status: "success", data: updatedContact})
}
