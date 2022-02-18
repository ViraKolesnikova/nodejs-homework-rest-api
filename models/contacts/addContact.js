const fs = require("fs/promises");
const path = require("path");

const {v4} = require('uuid')

const listContacts = require('./contactsList');

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
    await fs.writeFile(path.join(__dirname,'..',"..",'db', 'contacts.json'), JSON.stringify(contacts));
    return newContact;
  }catch(error){
    console.log(error);
  }
};

module.exports = addContact;