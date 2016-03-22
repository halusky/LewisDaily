/**
 * Created by matthewyun on 3/14/16.
 */

(function(){
"use strict";

// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    bodyParser = require('body-parser'), //Parser for reading request body
    mongoose = require( 'mongoose'), //MongoDB integration
    methodOverride = require('method-override'),
    CronJob = require('cron').CronJob; //Allows time-based execution

// Define route variables
var routes = require('./routes/index');
var addQuoteRoute = require('./routes/addQuoteRoute');
var booksRoute= require('./routes/booksRoute');
var aboutRoute= require('./routes/aboutRoute');
var pastQuotesRoute= require('./routes/pastQuotesRoute');

//Create server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Connect to database
mongoose.connect( 'mongodb://localhost/lewisDB' );

//Schemas

//Keywords for tagging each quote
var Keywords = new mongoose.Schema({
    keyword: String
});

var QuoteRepo = new mongoose.Schema({ //for all quotes
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

var Quote = new mongoose.Schema({ // for current quotes
    Book: String,
    Chapter: String,
    Passage: String,
    Number: Number,
    Author: String,
    Title: String,
    Current: Boolean,
    Date: Date,
    Keywords: Array
//    Keywords: [ Keywords ]
});

//Models
var quoteRepoModel = mongoose.model( 'quoteRepoModel', QuoteRepo);
var quoteModel = mongoose.model( 'quoteModel', Quote);


//**************************  Daily Job **************************//
var dailyQuoteUntag = quoteModel.findOneAndUpdate(
    {Current: true},
    {Current: false}
);

var dailyQuoteMove = function(){
    quoteRepoModel.findOneAndUpdate( //mark current quote as Used
        {Used: false},
        {Used: true},
        function (err, quote) {
            dailyQuoteUntag.exec(function(err, quote){
                console.log('untagged');
            });

            var newQuote = new quoteModel({
                Book: quote.Book,
                Chapter: quote.Chapter,
                Passage: quote.Passage,
                Number: quote.Number,
                Author: quote.Author,
                Title: quote.Title,
                Current: 1,
//        Current: quote.Current,
//        Date: quote.Date,
                Keywords: quote.Keywords
            });

            //throw error if newQuote empty
            if(newQuote === null){
                throw new Error('newQuote is null');
            }

            newQuote.save( function( err ) { //add new quote
                if( !err ) {
                    return console.log( 'created' );
                } else {
                    return console.log( err );
                }
            });
        }
    );
};

//    dailyQuoteMove();


new CronJob('00 59 23 * * *', dailyQuoteMove
    , null, true, 'America/New_York');

//try {
//    new CronJob('10 * * * * *', dailyQuoteMove
//        , null, true, 'America/Los_Angeles');
//} catch (error) {
//    console.log("Something went wrong: " + error);
//}

//console.log(currentPassage);

//**************************  Configure Server **************************//

//parses request body and populates request.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//checks request.body for HTTP method overrides
app.use(methodOverride());

// this is to populate the meta for data FB data scraping
app.get('/', function(req, res) {
    quoteModel.findOne(
        {Current: true}, 'Passage', function (err, passage) {
            //handle error
            if (err) throw err;
            else {
                res.render('index', {description: passage.Passage})
            }
        }
    );
});

//app.use('/', routes);
app.use('/addQuote', addQuoteRoute);
app.use('/books', booksRoute);
app.use('/about', aboutRoute);
app.use('/pastQuotes', pastQuotesRoute);
//Disabled AddQuestion page for now. Add back later (post MVP)

//Where to serve static content
app.use( express.static( path.join( application_root, 'public') ) );

//Show all errors in development
//app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));


// *******************  Routes (move to separate files) *******************

app.get( '/api', function( request, response ) {
    response.send( 'Library API is running' );
});

//Get a list of all quotes
app.get( '/api/quotes', function( request, response ) {
    return quoteModel.find( function( err, passage ) {
        if( !err ) {
            return response.send( passage );
        } else {
            return console.log( err );
        }
    });
});

//Get a single quote by id
app.get( '/api/quotes/:id', function( request, response ) {
    return quoteModel.findById( request.params.id, function( err, passage ) {
        if( !err ) {
            return response.send( passage );
        } else {
            return console.log( err );
        }
    });
});

//Insert a new quote
app.post( '/api/quotesRepo', function( request, response ) {

    console.log('POSTING');

    var quote = new quoteRepoModel({
        Book: request.body.Book,
        Chapter: request.body.Chapter,
        Passage: request.body.Passage,
        Number: request.body.Number,
        Author: request.body.Author,
        Title: request.body.Title,
        Used: 0,
//        Current: request.body.Current,
//        Date: request.body.Date,
        Keywords: request.body.Keywords
    });

    quote.save( function( err ) {
        if( !err ) {
            return console.log( 'created' );
        } else {
            return console.log( err );
        }
    });
});

//Update a quote
app.put( '/api/quotesRepo/:id', function( request, response ) {
    console.log( 'Updating quote ' + request.body.title );
    return quoteRepoModel.findById( request.params.id, function( err, quote ) {
        quote.Book = request.body.Book;
        quote.Chapter = request.body.Chapter;
        quote.Passage = request.body.Passage;
        quote.Number = request.body.Number;
        quote.Author = request.body.Author;
        quote.Title = request.body.Title;
//        quote.Current = request.body.Current;
//        quote.Date = request.body.Date;
        quote.Keywords = request.body.Keywords;

        return quote.save( function( err ) {
            if( !err ) {
                console.log( 'quote updated' );
            } else {
                console.log( err );
            }
            return response.send( passage );
        });
    });
});

//Delete a book
app.delete( '/api/quote/:id', function( request, response ) {
    console.log( 'Deleting book with id: ' + request.params.id );
    return quoteRepoModel.findById( request.params.id, function( err, passage ) {
        return passage.remove( function( err ) {
            if( !err ) {
                console.log( 'Quote removed' );
                return response.send( '' );
            } else {
                console.log( err );
            }
        });
    });
});

//Start server
var port = 3000;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

})();