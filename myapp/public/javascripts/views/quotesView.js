/**
 * Created by matthewyun on 3/14/16.
 */

var app = app || {};


app.quotesView = Backbone.View.extend({
//    el: $('#testQuestions'),
    tagName: 'div',
    className: 'quoteContainer',
    template: $('#quoteTemplate').html(),

    initialize: function(){

    },

    events: {
        // should clicking next button go here?

    },

    render: function () {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));

        return this;

    }

});