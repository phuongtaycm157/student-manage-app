var fs = require('fs');
var readline = require('readline-sync');

var contacts = [];

function showContacts (contacts) {
    for (var contact of contacts) {
        console.log(contact.name, contact.numphone);
    }
}

function saveContacts () {
    fs.writeFileSync('./data.json', JSON.stringify(contacts), {encoding: 'utf8'});
    console.log('Saved success!!!');
}

function loadData () {
    var stringContacts = fs.readFileSync('./data.json', {encoding: 'utf8'});
    contacts = JSON.parse(stringContacts);
}

function createNewContact () {
    var name = readline.question('Name: ');
    var numphone = readline.question('Phone number: ');
    var contact = {
        name: name,
        numphone: numphone
    };
    contacts.push(contact);
}

function modifyContact () {
    var nameOrNum = readline.question('Enter name which you want to modify: ');
    for (var contact of contacts) {
        if (nameOrNum.toLowerCase().localeCompare(contact.name.toLowerCase()) === 0) {
            var option = readline.question('Do you want to replace name? (y/n): ');
            if (option === 'y') {
                var newName = readline.question('Enter new name: ');
                contact.name = newName;
            }
            var option2 = readline.question('Do you want to replace phone number? (y/n): ');
            if (option2 === 'y') {
                var newPhone = readline.question('Enter new phone number: ');
                contact.numphone = newPhone;
            }
        }
    }
}

function deleteContact () {
    var deleteName = readline.question('Enter your name of contact you want to delete: ');
    var deleteContact = contacts.find(function(x){
        return x.name.toLowerCase().localeCompare(deleteName.toLowerCase()) === 0;
    })
    if (typeof deleteContact === 'undefined') {
        console.log(`Don\'t find contact has name ${deleteName}!`);
        return;
    }
    var indexContact = contacts.indexOf(deleteContact);
    contacts.splice(indexContact, 1);
}

function findContact () {
    var filterString = readline.question('Enter your name or phone number contact you want to find: ');
    var filterContacts = contacts.filter(function(x) {
        return x.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1 || x.numphone.indexOf(filterString) !== -1;
    })
    if (typeof filterContacts !== 'undefined') {
        showContacts(filterContacts);
    }
}

function showMenu () {
    console.log("1. Show all contacts");
    console.log("2. Create new contact");
    console.log("3. Modify contact");
    console.log("4. Delete contact");
    console.log("5. Find contact");
    console.log("6. Save & Exit");
    var option = readline.question("> ");
    switch(option){
        case '1':
            showContacts(contacts);
            showMenu();
            break;
        case '2':
            createNewContact();
            showMenu();
            break;
        case '3':
            modifyContact();
            showMenu();
            break;
        case '4':
            deleteContact();
            showMenu();
            break;
        case '5':
            findContact();
            showMenu();
            break;
        case '6':
            saveContacts();
            break;
        default:
            showMenu();
            break;
    }
}

function main () {
    loadData();
    showMenu();
}

main();