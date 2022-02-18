const fs = require("fs/promises");
const path = require("path");

const listContacts = require('./contactsList');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToDelete = contacts.find(contact=>contact.id === contactId);
  if(!contactToDelete){
    return
  }
  const updatedContacts = contacts.filter(contact=> contact.id!== contactId);
  await fs.writeFile(path.join(__dirname,'..', "..", 'db', 'contacts.json'), JSON.stringify(updatedContacts));
  return contactToDelete;
};

module.exports= removeContact;