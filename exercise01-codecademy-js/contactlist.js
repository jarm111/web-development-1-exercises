// Contact List

var friends = {};

friends.bill = {
    firstName: 'Bill',
    lastName: 'Gates',
    number: '(808) 904-0764',
    address: ['Studebaker', 'Michigan', '49739-3504', 'US']
};

friends.steve = {
    firstName: 'Steve',
    lastName: 'Jobs',
    number: '(778) 236-3130',
    address: ['Frisken Wye', 'Britsh Columbia', 'V7Z-8X0', 'CA']
};

var list = function(object) {
    for (var key in object) {
        console.log(friends[key]);
    }
};

var search = function(name) {
    for (var key in friends) {
        if (friends[key].firstName === name) {
            console.log(friends[key]);
            return friends[key];
        }
    }
};

list(friends);
search('Steve');
