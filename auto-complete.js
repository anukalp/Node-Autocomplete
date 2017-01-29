var express = require('express');
var bodyParser = require('body-parser');
var searchService = require('./searchService');
var compression = require('compression');
var dao = require('./dao');
var app = express();
var router = express.Router();
app.use(compression());


app.use(bodyParser.json());
// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    req.requestTime = Date.now();
    next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/search/?', function (req, res, next) {
    // if the user ID is 1, skip to the next router
    if (req.query.data) {
        searchService.getMatches(req.query.data, function (myData) {
            res.myData = myData;
            next('route');
        });

    }
    // otherwise pass control to the next middleware function in this stack
    else
        next();
}, function (req, res, next) {
    // render a regular page
    res.myData = "error";
    next('route');
});

router.post('/update', function (req, res, next) {
    console.log(req.body);
    if (req.body) {
        searchService.updateBookList(req.body, function () {
            res.myData = "success";
            next('route');
        });
    }
    // otherwise pass control to the next middleware function in this stack
    else
        next();
}, function (req, res, next) {
    // render a regular page
    res.myData = "error";
    next('route');
});

router.use(function (req, res) {
    res.send(res.myData);
});

app.listen(3000);
app.set('view engine', 'html');

// mount the router on the app
app.use('/', router);