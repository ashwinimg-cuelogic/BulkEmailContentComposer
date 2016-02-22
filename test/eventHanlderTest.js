var  assert = require('assert'), eventHandler = require('./../src/eventHandler');

describe('#handleEventData', function() {
    describe('#handleEventType', function() {
        it('should call to next function when event type is the insert', function() {
            var response = eventHandler.handleEventType('INSERT', {}, function() { });
        });

        it('should call callback function when event type is the other than insert', function() {
            var response = eventHandler.handleEventType('REMOVE', {}, function() { }, function() {});
        });
    });

    describe('#handleEmailType', function() {
        it('should call to next function when event type is the insert', function() {
            var response = eventHandler.handleEmailType('newsletter', {}, function() { });
        });

        it('should call callback function when event type is the insert', function() {
            var response = eventHandler.handleEmailType('codealert', {}, function() { }, function() {});
        });
    });

});
