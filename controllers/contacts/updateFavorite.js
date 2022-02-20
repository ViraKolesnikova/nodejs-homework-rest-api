const {Contact} = require('../../models');
const {favoriteValidation} = require('../../middlewares/validation/contactsValidation');

module.exports = async (req, res, next) => {
  if(!req.body){
    res.status(400).json({"message": "missing field favorite"});
  }
  const {favorite}= req.body;
  const id = req.params.contactId;
  const validationResult = favoriteValidation(req.body);
  if(validationResult.error){
    res.status(400).json({"message": validationResult.error.details});
    return
  }
  
  const updatedContact = await Contact.findByIdAndUpdate(id, {favorite}, {new:true});
  if (!updatedContact) {
    res.status(404).json({
      status: "Error 404",
      message: `Contact with id ${id} is not found`,
    });
    return
  }
  res.json({ status: "success", data: updatedContact });
}