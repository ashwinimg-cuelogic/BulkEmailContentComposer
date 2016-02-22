var  assert = require('assert'), getLambdaEventData = require('./../src/getLambdaEventData');

describe('#getLambdaEventData', function() {
    describe('#getEventRecords', function() {
        it('should call to next function when event Record is not present', function() {
            var response = getLambdaEventData.getEventRecords({}, function() {
            });
        });

        it('should return records if specified in event object', function() {
            var response = getLambdaEventData.getEventRecords({ 'Records': 'test' });
            assert.equal(response, 'test');
        });
    });

    describe('#getEventName', function() {
        it('should call to next function when Event Name is not specified', function() {
            var response = getLambdaEventData.getEventName({}, function() {
            });
        });

        it('should return Event Name if specified in event object', function() {
            var response = getLambdaEventData.getEventName({ 'eventName': 'test' });
            assert.equal(response, 'test');
        });
    });

    describe('#getTimestamp', function() {
        it('should call to next function when Timestamp is not specified', function() {
            var response = getLambdaEventData.getTimestamp({ 'dynamodb': { 'NewImage': { 'Timestamp': '' } } }, function() {
            });
        });

        it('should return Timestamp if specified in event object', function() {
            var response = getLambdaEventData.getTimestamp({ 'dynamodb': { 'NewImage': { 'Timestamp': { 'N': '123123' } } } });
            assert.equal(response, 123123);
        });
    });

    describe('#getUserId', function() {
        it('should call to next function when UserId is not specified', function() {
            var response = getLambdaEventData.getUserId({ 'dynamodb': { 'NewImage': { 'UserId': '' } } }, function() {
            });
        });

        it('should return UserId if specified in event object', function() {
            var response = getLambdaEventData.getUserId({ 'dynamodb': { 'NewImage': { 'UserId': { 'N': '123123' } } } });
            assert.equal(response, 123123);
        });
    });

    describe('#getEmailType', function() {
        it('should call to next function when Email Type is not specified', function() {
            var response = getLambdaEventData.getEmailType({ 'dynamodb': { 'NewImage': { 'EmailType': {} } } }, function() {
            });
        });

        it('should return Email Typee if specified in event object', function() {
            var response = getLambdaEventData.getEmailType({ 'dynamodb': { 'NewImage': { 'EmailType': { 'S': 'test' } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getLocal', function() {
        it('should call to next function when Local is not specified', function() {
            var response = getLambdaEventData.getLocal({ 'dynamodb': { 'NewImage': { 'Local': { } } } }, function() {
            });
        });

        it('should return Local if specified in event object', function() {
            var response = getLambdaEventData.getLocal({ 'dynamodb': { 'NewImage': { 'Local': { 'S': 'test' } } } });
            assert.equal(response, 'test');
        });
    });

    describe('#getReferenceId', function() {
        it('should call to next function when ReferenceId is not specified', function() {
            var response = getLambdaEventData.getReferenceId({ 'dynamodb': { 'NewImage': { 'ReferenceId': {  } } } }, function() {
            });
        });

        it('should return ReferenceId if specified in event object', function() {
            var response = getLambdaEventData.getReferenceId({ 'dynamodb': { 'NewImage': { 'ReferenceId': { 'N': '123' } } } });
            assert.equal(response, '123');
        });
    });
});
