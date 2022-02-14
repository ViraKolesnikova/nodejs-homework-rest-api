const express = require("express");

const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (!contacts) {
    res.status(400).json({
      status: "Error 400",
      message: `Bad request`,
    });
    return
  }
  res.json({ status: "success", data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    res.status(404).json({
      status: "Error 404",
      message: `Contact with id ${id} is not found`,
    });
    return
  }
  res.json({ status: "success", data: contactById });
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9 ]+$/, 'numbers')
      .min(10)
      .max(16)
      .required()
  })

  const validationResult = schema.validate(req.body);
  if(validationResult.error){
    res.status(400).json({"message": validationResult.error.details});
    return
  }
     
 const newContact = await addContact(req.body);
  res.status(201).json({ status: "Created", data: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if(!id){
    return
  }
  const contactById = await removeContact(id);
  if (!contactById) {
    res.status(404).json({
      status: "Error 404",
      message: `Contact with id ${id} is not found`,
    });
    return
  }
  res.status(200).json({ status: "success", message: "contact is deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if(!id || !body){
    res.status(400).json({"message": "Bad request"});
    return;
  }

  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9 ]+$/, 'numbers')
      .min(10)
      .max(16)
      .required()
  })

  const validationResult = schema.validate(req.body);
  if(validationResult.error){
    res.status(400).json({"message": validationResult.error.details});
    return
  }
  const updatedContact = await updateContact(id, body);
  res.status(200).json({status: "success", data: updatedContact})
});

module.exports = router;
