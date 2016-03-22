/**
 * Created by matthewyun on 3/14/16.
 */

var app = app || {};

app.mainView = Backbone.View.extend({

    el: $('#quotes'),

    initialize: function() {
        this.collection = new app.quotesCollection();
        this.collection.fetch({reset:true});
        //why render on initialize? collection is still empty
//        this.render();
        this.getDate();


        this.listenTo(this.collection, 'add', this.renderQuote);
        this.listenTo(this.collection, 'reset', this.render );
    },

    events: {
        'click #btnAddQuestion': 'addQuestion',
        'click #btnSubmit': 'submitAnswer',
        'click #headerBox img': 'linkHome'

//        // remove 'errorPlaceholder' class
//        'focus .errorPlaceholder' : 'removeClass'
    },


    render: function() {
        //Delete previous question
        this.$el.empty();

        //determine next question number
        var passage = this.collection.find(function(model) {
                return model.get('Current') === true; }
            , this);

        passage.attributes.Date = this.getDate();

        //kickoff renderQuestion
        this.renderQuote(passage);

    },
    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderQuote: function(passage) {

        var quoteView = new app.quotesView({
            model: passage
        });


        this.$el.append(quoteView.render().el);

        //kickoff renderMeta
//        this.renderMeta();

    },

    getDate: function() {
        var fullDate = new Date();

        //convert month to 2 digits
        var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

        var currentDate = twoDigitMonth + "/" + fullDate.getDate()  + "/" + fullDate.getFullYear();

        return currentDate;

    }

});