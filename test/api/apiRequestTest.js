var assert, apiRequestModule, http;
assert = require('assert');
apiRequestModule = require("./../../src/api/apiRequest.js");
http = require('http');

describe('#getNewsletterData', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.getNewsletterData({ "Local": "en", "EmailType": "newsletter", "UserId":1 }, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });

    it('should call next function on success of  api request', function() {
        var response = apiRequestModule.getNewsletterData({ "Local": "en", "EmailType": "newsletter", "UserId":1 }, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });
});

describe('#getNewsletterContent', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.getNewsletterContent({ "Local": "en", "EmailType": "newsletter", "ReferenceId": 1 }, { 'receiver_email':'arthur@imbull.com' }, function() {});
    });
});

describe('#updateNewsletterStatus', function() {
    it('should return error if error is produced in api request', function() {
        var response = apiRequestModule.updateNewsletterStatus({ "Local": "en", "EmailType": "newsletter", "ReferenceId": 1 }, 1,function() {});
    });

    it('should call next function on success of  api request', function() {
        var response = apiRequestModule.updateNewsletterStatus({ "Local": "en", "EmailType": "newsletter", "ReferenceId": 1 }, 1,function() {});
    });
});


