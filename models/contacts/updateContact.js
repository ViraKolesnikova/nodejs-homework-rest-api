const fs = require("fs/promises");
const path = require("path");

const listContacts = require('./contactsList');
const getContactById = require('./contactById');

const updateContact = async (contactId, {name, email, phone}) => {
  try{
    const contacts = await listContacts();
    let contactToUpdate = await getContactById(contactId);
    contactToUpdate={
      id: contactId,
      name,
      email,
      phone
    }
    const updatedContactsList = contacts.map(contact =>  contact.id === contactId ? contactToUpdate : contact);
    await fs.writeFile(path.join(__dirname,'..', "..", 'db', 'contacts.json'), JSON.stringify(updatedContactsList));
    
    return contactToUpdate;    
  }catch(error){
    console.log(error);
  }
};

module.exports = updateContact;