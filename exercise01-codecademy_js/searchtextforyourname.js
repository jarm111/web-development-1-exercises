// Search Text for Your name

/*jshint multistr:true */

var text = 'Pellentesque commodo sit Jarmo amet tellus sit amet euismod. \
Fusce lacus magna, elementum quis molestie Jarmo ut, tincidunt vel quam. \
Nulla vitae augue ac justo dictum mollis in vel nisl. Maecenas Jarmo \
efficitur vel mauris eget interdum.';
var myName = 'Jarmo';
var hits = [];

for (var i = 0; i < text.length; i++) {
    if (text[i] === 'J') {
        for (var j = i; j < i + myName.length; j++) {
            hits.push(text[j]);
        }
    }
}

if (hits.length === 0) {
    console.log('Your name wasn\'t found!');
} else {
    console.log(hits);
}
