const fs = require("fs/promises");
const path = require("path");

const {v4} = require('uuid')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(path.join(__dirname, "contacts.json"), "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [contactById] = contacts.filter((item) => item.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try{
    const contacts = await listContacts();
    const {name, email, phone} = body;
    const newContact = {
      id: v4(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(path.join(__dirname,'..','models', 'contacts.json'), JSON.stringify(contacts));
    return newContact;
  }catch(error){
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
