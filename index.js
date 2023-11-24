import * as contactsService from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);
    case "contactById":
      const contactById = await contactsService.getContactById(id);
      return console.log("Searched contact", contactById);
    case "removeContact":
      const removedContact = await contactsService.removeContact(id);
      return console.log("Removed contact - ", removedContact);

    case "addContact":
      const newContact = await contactsService.addContact(data);
      return console.log("Added contact", newContact);
      break;

    default:
      return console.log("Unknown action");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
