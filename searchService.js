(function () {
    var root = this;
    var searchService = {};
    var fs = require('fs');
    searchService.booksList = null;

    searchService.getBooks = function (callback) {
        if (searchService.booksList) {
            callback(searchService.booksList);
        } else {
            fs.readFile('./booksData.json', 'utf8', function (err, data) {
                if (err)
                    throw err;
                data = data.replace(/'/g, "\\'");
                searchService.booksList = JSON.parse(data);
                callback(searchService.booksList);
            });
        }
    };

    searchService.updateBookList = function (booksJson, callback) {
        searchService.booksList = booksJson;
        fs.writeFile('./booksData.json', JSON.stringify(booksJson), 'utf8', function () {
            console.log("SuccessFully Updated File System");
            callback();
        });
    };

    searchService.getMatches = function (searchText, callback) {
        searchService.getBooks(function (list) {
            this.Fuse = require('./fuse.js');
            var options;
            if (isNaN(searchText)) {
                options = {
                    threshold: 0.2,
                    location: 0,
                    distance: 5,
                    maxPatternLength: 50,
                    minMatchCharLength: 3,
                    keys: [
                        "title",
                        "author"
                    ]
                };
            } else {
                options = {
                    threshold: 0.1,
                    location: 0,
                    distance: 0,
                    maxPatternLength: 30,
                    minMatchCharLength: 3,
                    keys: [
                        "isbn"
                    ]
                };
            }

            var startTime = new Date().getTime();
            var fuse = new Fuse(list, options);
            // "list" is the item array
            var result = fuse.search(searchText);
            callback(JSON.stringify(result));
            console.log("Total time taken :: " + (new Date().getTime() - startTime));
        });
    };
// Use in node or in browser
    if (typeof exports !== 'undefined') {
        module.exports = searchService;
    } else {
        root.booksData = searchService;
    }
    ;
}());
