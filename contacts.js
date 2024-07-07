const fs = require('fs').promises;
const path = require('path');

 const contactsPath = path.join(__dirname, 'db', 'contacts.json');


// TODO: documentare fiecare funcție
function listContacts() {
    return fs.readFile(contactsPath, 'utf8')
      .then(data => {
        return JSON.parse(data);
      })
      .catch(error => {
        console.error('Error reading contacts:', error);
        throw error;
      });
  }
  
  
  function getContactById(contactId) {
    return listContacts()
      .then(contacts => {
        const contact = contacts.find(contact => contact.id === contactId);
        return contact || null;
      })
      .catch(error => {
        console.error('Error getting contact by ID:', error);
        throw error;
      });
  }
    
  
  function removeContact(contactId) {
    return listContacts()
      .then(contacts => {
        const index = contacts.findIndex(contact => contact.id === contactId);
        if (index === -1) {
          return null;
        }
        const removedContact = contacts.splice(index, 1)[0];
        return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
          .then(() => removedContact)
          .catch(error => {
            console.error('Error writing contacts:', error);
            throw error;
          });
      })
      .catch(error => {
        console.error('Error removing contact:', error);
        throw error;
      });
  }
  
  function addContact(name, email, phone) {
    return listContacts()
      .then(contacts => {
        const newContact = {
          id: (contacts.length + 1).toString(),
          name,
          email,
          phone
        };
        contacts.push(newContact);
        return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
          .then(() => newContact)
          .catch(error => {
            console.error('Error writing contacts:', error);
            throw error;
          });
      })
      .catch(error => {
        console.error('Error adding contact:', error);
        throw error;
      });
  }
  
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };