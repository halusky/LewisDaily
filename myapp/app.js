/**
 * Created by matthewyun on 3/14/16.
 */
// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    bodyParser = require('body-parser'), //Parser for reading request body
    mongoose = require( 'mongoose'), //MongoDB integration
    methodOverride = require('method-override'),
    CronJob = require('cron').CronJob; //Allows time-based execution


//new CronJob('* * * * * *', function() {
//    console.log('You will see this message every second');
//}, null, true, 'America/Los_Angeles');



// Define route variables
var routes = require('./routes/index');
var addQuoteRoute = require('./routes/addQuoteRoute');
var booksRoute= require('./routes/booksRoute');
var aboutRoute= require('./routes/aboutRoute');
var pastQuotesRoute= require('./routes/pastQuotesRoute');

var moduleTest = require('./modules/moveQuote');


new CronJob('* * * * * *', moduleTest
    , null, true, 'America/Los_Angeles');



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
var quoteModel = mongoose.model( 'quoteModel', Quote);
var quoteRepoModel = mongoose.model( 'quoteRepoModel', QuoteRepo);


// Configure server

//parses request body and populates request.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//checks request.body for HTTP method overrides
app.use(methodOverride());

app.use('/', routes);
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
app.post( '/api/quotes', function( request, response ) {

    console.log('POSTING');

    var quote = new quoteModel({
        Book: request.body.Book,
        Chapter: request.body.Chapter,
        Passage: request.body.Passage,
        Number: request.body.Number,
        Author: request.body.Author,
        Title: request.body.Title,
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
app.put( '/api/quotes/:id', function( request, response ) {
    console.log( 'Updating quote ' + request.body.title );
    return quoteModel.findById( request.params.id, function( err, quote ) {
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
    return quoteModel.findById( request.params.id, function( err, passage ) {
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