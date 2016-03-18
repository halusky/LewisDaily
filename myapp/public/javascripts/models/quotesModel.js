/**
 * Created by matthewyun on 3/14/16.
 */

var app = app || {};

app.quotesModel = Backbone.Model.extend({
    defaults: {
        Book: '',
        Chapter: '',
        Passage: '',
        Number: '',
        Author:'C.S. Lewis',
        Title: '',
        Current: '',
        Date: '',
        Keywords: []
    }

});
