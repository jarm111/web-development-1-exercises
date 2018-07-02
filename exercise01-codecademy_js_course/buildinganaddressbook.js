// Building an Address Book

var bob = {
    firstName: 'Bob',
    lastName: 'Jones',
    phoneNumber: '(650) 777-7777',
    email: 'bob.jones@example.com'
};

var mary = {
    firstName: 'Mary',
    lastName: 'Johnson',
    phoneNumber: '(650) 888-8888',
    email: 'mary.johnson@example.com'
};

var contacts = [bob, mary];

// printPerson added here
var printPerson = function(person) {
    console.log(person.firstName + ' ' + person.lastName);
};

var list = function() {
    var contactsLength = contacts.length;
    for (var i = 0; i < contactsLength; i++) {
        printPerson(contacts[i]);
    }
};

/*Create a search function
then call it passing "Jones"*/
var search = function(lastName) {
    var contactsLength = contacts.length;
    for (var i = 0; i < contactsLength; i++) {
        if (lastName === contacts[i].lastName) {
            printPerson(contacts[i]);
        }
    }
};

var add = function(firstName, lastName, email, phoneNumber) {
    contacts[contacts.length] = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: email,
        email: phoneNumber
    };
};

add('Kalle', 'Kullero', '010-203123', 'asdf@asdf.com');
search('Kullervo');
list();
