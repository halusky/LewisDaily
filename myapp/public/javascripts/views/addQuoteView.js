/**
 * Created by matthewyun on 3/14/16.
 */

var app = app || {};
"use strict";

app.addQuoteView = Backbone.View.extend({
    el:$('#addQuote'),

    initialize: function(){
        this.collection = new app.quotesCollection();
        this.collection.fetch(); //perhaps add parameter to fetch just 'current'

    },


    events:{
        'click #btnAddQuote': 'addQuote'
    },


    addQuote: function(e){
        e.preventDefault();

        console.log('addQuote running');

        // *** INPUT VERIFICATION
        // check for empty fields. Populate with red error message
        var errors = 0;
        $('#addQuote fieldset').children('input').each(function(i, el) {
            if ($(el).val() == '') {
                el.placeholder = '*PLEASE FILL OUT';

                $(el).addClass('errorPlaceholder');
                errors ++;
            }
        });

//        check for question w/ same number
        var numberInput = $('#Number').val();

        if (this.collection.find(function(model){
            return model.get('Number') == numberInput;
        }, this)){
            errors ++;
            alert('Number value already used.');
        }

        // If no errors, use input data to create new collection
        if (errors === 0) {
            var newQuote = {};
            $('#addQuote fieldset').children('input').each(function (i, el) {
                newQuote[el.id] = $(el).val();
            });

            $.post('/api/quotesRepo',
                {
                    Book: newQuote.Book,
                    Chapter: newQuote.Chapter,
                    Passage: newQuote.Passage,
                    Number: newQuote.Number,
                    Author: newQuote.Author,
                    Title: newQuote.Title,
                    Keywords: newQuote.Keywords
                },
                function(data, status){
                    alert("Data: " + data + "\nStatus: " + status);
                });


        }




    }

});