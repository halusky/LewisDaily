/**
 * Created by matthewyun on 3/14/16.
 */
var express = require('express');
var router = express.Router();


//Direct towards addQuote page
router.get('/', function(req,res){
   res.render('addQuote');

});

module.exports = router;



