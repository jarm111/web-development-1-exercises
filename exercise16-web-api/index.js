$(document).ready(function () {
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=javascript&langRestrict=en', function (data) {
        for (var i = 0; i < data.items.length; i++) {
            var vol = data.items[i].volumeInfo;
            bookToRowModule.insertBook(i, vol.title, vol.subtitle, vol.authors, vol.publishedDate, vol.description);
        }
        console.log(data);
    });
});

var bookToRowModule = (function () {
    function insertBook(tableRowIndex, title, subTitle, authors, date, description) {
        $('#books').append(
            '<tr><th scope="row">'
            + ++tableRowIndex +
            '</th><td>'
             + formatTitle(title, subTitle) +
             '</td><td>'
             + formatAuthors(authors) +
             '</td><td>'
             + getYearFromDate(date) +
             '</td><td>'
             + formatDescription(description, 200) +
             '</td></tr>'
        );
    }
    
    function formatTitle(title, subtitle) {
        if (subtitle && !title.includes(subtitle)) {
            return title + ' - ' + subtitle;
        }
        
        return title;
    }
    
    function formatAuthors(authors) {
        return authors.join(', ');
    }
    
    function getYearFromDate(date) {
        return new Date(date).getFullYear();
    }
    
    function formatDescription(description, maxLength) {
        if (description.length > maxLength) {  
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }

    return {
        insertBook: insertBook
    };
}());