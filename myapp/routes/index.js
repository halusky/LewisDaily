/**
 * Created by matthewyun on 3/14/16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

//router.get('/', function(req, res) {
//    res.render('landing', { title: 'Hello', title2: 'Express' });
//});

module.exports = router;


