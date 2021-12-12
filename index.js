const chalk = require("chalk");
const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contact");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      listContacts();
      const contacts = await listContacts();
      console.log(chalk.blue("List of contacts: "));
      console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      if (contactById) {
        console.log(chalk.blue(`Get contact by ID=${id}:`));
        console.table(contactById);
        return;
      }
      console.log(chalk.red("Contact not found"));

      break;

    case "add":
      const contact = await addContact(name, email, phone);
      console.log(
        chalk.blue("Contacts added successfully! New lists of contacts: ")
      );
      console.table(contact);
      break;

    case "remove":
      const contactList = await removeContact(id);
      console.log(
        chalk.blue("Contact deleted successfully! New list of contacts: ")
      );
      console.table(contactList);
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv);
