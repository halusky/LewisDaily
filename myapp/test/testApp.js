/**
 * Created by matthewyun on 3/21/16.
 */

var myapp = require('../app');

var expect = require('chai').expect;

describe('this is a teset suite', function(){
    it('this should pass', function(){
        expect(myapp).to.exist;
    })
});


