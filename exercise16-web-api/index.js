
$(document).ready(function () {
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=javascript', function (data) {
        for (var i = 0; i < data.items.length; i++) {
            // var item = data.items[i];
            // $('#content').append('<br>' + item.volumeInfo.title);
            var vol = data.items[i].volumeInfo;
            appendBooks(i, vol.title, vol.authors[0], vol.publishedDate, vol.description);
        }
        console.log(data);
    });
});

function appendBooks(tableRowIndex, title, author, date, description) {
    $('#books').append(
        '<tr><th scope="row">'
        + ++tableRowIndex +
        '</th><td>'
         + title +
         '</td><td>'
         + author +
         '</td><td>'
         + date +
         '</td><td>'
         + description +
         '</td></tr>'
    );
}