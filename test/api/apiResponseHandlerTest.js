var assert = require('assert'), functionModule = require("./../../src/api/apiResponseHandler.js");

describe('apiResponseHandler', function() {
    describe('#handleGetNewsletterContentResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = functionModule.handleGetNewsletterContentResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = functionModule.handleGetNewsletterContentResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"parse error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = functionModule.handleGetNewsletterContentResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return error if response is not valid', function() {
            var response = functionModule.handleGetNewsletterContentResponse(null, '{}', { 'receiver_email':'test@test.com' });
            assert.deepEqual(response, { "error":"NO newsletter found with the given data" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = functionModule.handleGetNewsletterContentResponse(null, '{"content": "test"}');
            assert.deepEqual(response, { "content": "test"});
        });

    });

    describe('#handleGetNewsletterDataResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = functionModule.handleGetNewsletterDataResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = functionModule.handleGetNewsletterDataResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"parse error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = functionModule.handleGetNewsletterDataResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return error if response is not valid', function() {
            var response = functionModule.handleGetNewsletterDataResponse(null, '{}', { 'receiver_email':'test@test.com' });
            assert.deepEqual(response, { "error":"NO newsletter found with the given data" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = functionModule.handleGetNewsletterDataResponse(null, '{"id":4591}');
            assert.deepEqual(response, { "newsletter": { "id":4591 }});
        });
    });

    describe('#handleUpdateNewsletterStatusResponse', function() {
        it('should return error if error is produced in api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse("error");
            assert.deepEqual(response, { 'error':"error" });
        });

        it('should return error if invalid json object is passed by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, "{'':}");
            assert.deepEqual(response, { "error":"API error" });
        });

        it('should return error if 200 response is not returned by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, '{"code": 400, "messages": "pages not found"}');
            assert.deepEqual(response, { "error":"API Response returns pages not found" });
        });

        it('should return response with newsletter if valid data is passed by api request', function() {
            var response = apiResponseHandler.handleUpdateNewsletterStatusResponse(null, '{"id":4591}');
            assert.deepEqual(response, { "newsletter": { "id":4591 } });
        });
    });
});

