const { BadRequest } = require('http-errors');

const { contactValidation } = require('../../middlewares');
const {Contact} = require('../../models');

module.exports = async (req, res, next) => {
  const {_id} = req.user;
  const validationResult = contactValidation(req.body);

  if(validationResult.error){
    throw new BadRequest(validationResult.error.details);
  }

 const newContact = await Contact.create({...req.body, owner: _id});
  res.status(201).json({ status: "Created", data: newContact });
}
