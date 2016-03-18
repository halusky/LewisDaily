/**
 * Created by matthewyun on 3/16/16.
 */


var that = function(){
    console.log('module test!!!!');
};

//Connect to database
mongoose.connect( 'mongodb://localhost/lewisDB' );


//Find last item in DB A and mark 'Current' field as False and populate Date
//Find an item in DB B (random? last?) and set 'Used' to True
//Move new item to DB A. Set 'Current' field to
//
//
//

var QuoteRepo = new mongoose.Schema({
    Book: String,
    Chapter: String,
    Passage: String,
    Number: Number,
    Author: String,
    Title: String,
    Used: Boolean,
    Keywords: Array
//    Keywords: [ Keywords ]
});

//Models
var quoteRepoModel = mongoose.model( 'quoteRepoModel', QuoteRepo);


app.get( '/api/quotes/:id', function( request, response ) {
    return quoteModel.findById( request.params.id, function( err, passage ) {
        if( !err ) {
            return response.send( passage );
        } else {
            return console.log( err );
        }
    });
});






module.exports = that;
