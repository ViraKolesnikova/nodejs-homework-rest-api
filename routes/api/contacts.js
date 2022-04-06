const express = require("express");

const { contacts } = require("../../controllers");
const { wrapper, authMiddleware } = require('../../middlewares');

const router = express.Router();


router.get("/", authMiddleware, wrapper(contacts.getContacts));

router.get("/:contactId", authMiddleware, wrapper(contacts.getContactById));

router.post("/", authMiddleware, wrapper(contacts.createContact));

router.delete("/:contactId", authMiddleware, wrapper(contacts.deleteContact));

router.put("/:contactId", authMiddleware, wrapper(contacts.putContact));

router.patch("/:contactId/favorite", authMiddleware, wrapper(contacts.updateFavorite));

module.exports = router;
