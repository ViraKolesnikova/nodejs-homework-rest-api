const express = require("express");

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  putContact,
  updateFavorite
} = require("../../controllers/contacts");

const router = express.Router();


router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;
