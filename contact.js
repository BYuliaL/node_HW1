const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContacts = async () => {
  const contacts = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(contacts);
  return result;
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(newContacts, null, 2)
  );
  return newContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = {
    name,
    email,
    phone,
    id: crypto.randomUUID(),
  };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return contacts;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
