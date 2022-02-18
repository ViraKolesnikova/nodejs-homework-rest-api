const fs = require("fs/promises");
const path = require("path");

const listContacts = async () => {
  console.log(__dirname);
  try {
    const contacts = await fs.readFile(path.join(__dirname, "..", "..", "db", "contacts.json"), "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

module.exports = listContacts;