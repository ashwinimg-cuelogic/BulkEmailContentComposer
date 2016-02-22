exports.handler = function(event, context) {
    require('dotenv').load();
    // console.log(JSON.stringify(event, null, 2));
    var apiRequest, getLambdaEventData, async, composeBulkEmailContent, eventHandler;

    getLambdaEventData = require('./src/getLambdaEventData');
    apiRequest = require('./src/api/apiRequest');
    dynamodbRequest = require('./src/dynamodbRequests');
    eventHandler = require('./src/eventHandler');
    async = require('async');

    composeBulkEmailContent  = function(record, callback) {
        // console.log(record);
        async.waterfall([
                function getEventType(next) {

                    EventType = getLambdaEventData.getEventName(record, next);
                    eventHandler.handleEventType(EventType, record, next, callback);

                }, function getEmailType(record , next) {

                    EmailType = getLambdaEventData.getEmailType(record, next);
                    eventHandler.handleEmailType(EmailType, record, next, callback);

                }, function getNewsletterData(record, EmailType, next) {

                    console.log("Seems to be a new request to send a bulk email. Getting the email campaign data from the API.");
                    Local = getLambdaEventData.getLocal(record, next);
                    ReferenceId = getLambdaEventData.getReferenceId(record, next);
                    BulkEmailTimestamp = getLambdaEventData.getTimestamp(record, next);
                    UserId = ( EmailType == "testnewsletter") ? getLambdaEventData.getUserId(record, next) : null ;
                    newsletterData = apiRequest.getNewsletterData({
                        'Local': Local,
                        "EmailType": EmailType,
                        "ReferenceId": ReferenceId,
                        "UserId":  UserId,
                        "BulkEmailTimestamp":BulkEmailTimestamp
                    }, event, next, callback);

                }, function getEmailContent(EmailObject, next) {

                    console.log("Getting the email campaign content from the API.");
                    apiRequest.getNewsletterContent(EmailObject, event, next);

                },function updateStatusOfNewsletterToTriggeredViaApiCall(EmailContentObject, next) {

                    console.log("Setting the newsletter campaign status to triggered.");
                    apiRequest.updateNewsletterStatus(EmailContentObject, "Triggered", next);

                }, function UpdateStatusInBulkEmail(EmailContentObject, next) {

                    console.log("Setting the BulkEmail row to triggered so it can not be send again.");
                    dynamodbRequest.UpdateStatusInBulkEmail(EmailContentObject, next);

                }, function putRowsInDynamoDB(EmailContentObject, next) {

                    console.log("Adding the email content to EmailContentTable.\n------------------\n");
                    dynamodbRequest.putRecord(EmailContentObject, next);

                } ], function(err) {
                if (err) {
                    console.error(
                        err
                    );
                    callback(err);
                } else {
                    callback();
                }
            }
        );
    }

    records = getLambdaEventData.getEventRecords(event);
    async.forEachOfSeries(records, function(record, key, callback) {
        composeBulkEmailContent(record, callback);
    }, function(err) {
        if (err) {
            context.done(err);
        } else {
            context.done(null, "Finished with this execution. Now it's up to the other guys.\n------------------\n");
        }
    });
}
