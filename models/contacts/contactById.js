const listContacts = require('./contactsList');

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const [contactById] = contacts.filter((item) => item.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

module.exports= getContactById;