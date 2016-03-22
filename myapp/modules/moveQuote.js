/**
 * Created by matthewyun on 3/16/16.
 */


//var that = function(){
//    console.log('module test!!!!');
//};


//Find last item in DB A and mark 'Current' field as False and populate Date
//Find an item in DB B (random? last?) and set 'Used' to True
//Move new item to DB A. Set 'Current' field to
//
//
//

//var test = quoteModel.findAndModify({
//    Used: True
//
//});
//
//console.log('test is ' + test);



//Models
//var quoteRepoModel = mongoose.model( 'quoteRepoModel', QuoteRepo);


//var mongoose = require( 'mongoose');
//
//mongoose.connect( 'mongodb://localhost/lewisDB' );
//
//
//var QuoteRepo = new mongoose.Schema({ //for all quotes
//    Book: String,
//    Chapter: String,
//    Passage: String,
//    Number: Number,
//    Author: String,
//    Title: String,
//    Used: Boolean,
//    Keywords: Array
////    Keywords: [ Keywords ]
//});
//
//var quoteRepoModel = mongoose.model( 'quoteRepoModel', QuoteRepo);
//
//
//
//
that = {
    test: function () {
        quoteRepoModel.findAndModify({
            query: {Used: 0},
            udpate: {Used: 1}

        });
    }
};
//
//var that = function(){
//    console.log('module test')
//};


module.exports = that;
