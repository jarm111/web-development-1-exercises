$(document).ready(function () {
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=javascript', function (data) {
        for (var i = 0; i < data.items.length; i++) {
            var item = data.items[i];
            $('#content').append('<br>' + item.volumeInfo.title);
        }
        console.log(data);
    });
});