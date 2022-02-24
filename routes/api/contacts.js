const express = require("express");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
  updateFavorite
} = require("../../controllers/contacts");

const router = express.Router();


router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", putContact);

router.patch("/:contactId/favorite", updateFavorite);

module.exports = router;

