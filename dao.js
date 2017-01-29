/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    var searchService = require('./searchService');
    var cron = require('node-cron');
    var mysql = require('mysql');

    cron.schedule('* */6 * * *', function () {
        console.log('running a database quer every 6 hours');

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'dbuser',
            password: 's3kreee7'
        });

        connection.connect();

        connection.query('SELECT * FROM books', function (err, rows) {
            if (err)
                throw err;
            searchService.updateBookList(rows);
        });

        connection.end();

    });

})();

