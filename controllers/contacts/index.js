const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const deleteContact = require("./deleteContact");
const putContact = require("./putContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  putContact,
  updateFavorite
};
