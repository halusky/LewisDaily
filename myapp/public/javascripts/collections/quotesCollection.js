/**
 * Created by matthewyun on 3/14/16.
 */

var app = app || {};

app.quotesCollection = Backbone.Collection.extend({
    model: app.quotesModel,
    url: '/api/quotes'

});