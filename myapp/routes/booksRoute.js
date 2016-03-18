/**
 * Created by matthewyun on 3/15/16.
 */
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    res.render('books');
});



module.exports = router;

