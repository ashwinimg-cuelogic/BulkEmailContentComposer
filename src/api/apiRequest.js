var  getNewsletterContent, getNewsletterData, request, async, getLambdaEventData, updateNewsletterStatus;

request = require('request');
async = require('async');
initApi = require('./initApi');
apiResponseHandler = require('./apiResponseHandler');
getLambdaEventData = require('./../getLambdaEventData');

getNewsletterData = function(EventRecord, event, parent_next, callback) {
    //console.log(initApi.getAPIURL(EventRecord.Local) + 'newslettercampaigns/' + EventRecord.ReferenceId + '?api_key=' + initApi.getAPIKey());
    request({
        uri: initApi.getAPIURL(EventRecord.Local) + 'newslettercampaigns/' + EventRecord.ReferenceId + '?api_key=' + initApi.getAPIKey(),
        method: 'get',
        headers: { 'content-type': 'application/json' }
    }, function(error, response, body) {
        response = apiResponseHandler.handleGetNewsletterDataResponse(error, body, event);
        if (response.error)  {
            parent_next(response.error);
        } else {
            scheduledDate = new Date(response.newsletter.scheduledTime);
            console.log("-------------");
            console.log("debugging security check.");
            console.log("EmailType: " + EmailType);
            console.log("DynamoDb row timestamp: " + EventRecord.BulkEmailTimestamp);
            console.log("API campaign timestamp: " + scheduledDate.getTime());
            console.log("Schedule status: " + response.newsletter.scheduledStatus);
            console.log("-------------");
            if (EmailType !== "newsletter" || (EmailType === "newsletter" && EventRecord.BulkEmailTimestamp === scheduledDate.getTime() && response.newsletter.scheduledStatus === "Scheduled")) {
                EmailObject = {
                    "Local": Local,
                    "ReferenceId": ReferenceId,
                    "EmailType": EmailType,
                    "From": response.newsletter.senderEmail,
                    "SenderName": response.newsletter.senderName,
                    "Subject": (typeof(response.newsletter.campaignSubject) === "undefined") ? "Newsletter" : response.newsletter.campaignSubject,
                    "UserId": (EventRecord.UserId) ? parseInt(EventRecord.UserId) : null,
                    "BulkEmailTimestamp": parseInt(EventRecord.BulkEmailTimestamp)
                }
                console.log("Email can be send, security check passed.");
                parent_next(null, EmailObject);
            } else {
                console.log("Security check failed. Not sending any email and exiting the process.\n------------------\n");
                callback();
            }
        }
    });
};

getNewsletterContent = function(EmailObject, event, parent_next) {
    ApiCallEmailType = getApiCallEmailType(EmailObject.EmailType);
    //console.log(initApi.getAPIURL(EmailObject.Local) + 'emailcontents/' + ApiCallEmailType + '/' + EmailObject.ReferenceId + '?api_key=' + initApi.getAPIKey());
    request({
        uri: initApi.getAPIURL(EmailObject.Local) + 'emailcontents/' + ApiCallEmailType + '/' + EmailObject.ReferenceId + '?api_key=' + initApi.getAPIKey(),
        method: 'get',
        headers: { 'content-type': 'application/json' }
    }, function(error, response, body) {
        response = apiResponseHandler.handleGetNewsletterContentResponse(error, body, event);
        if (response.error)  {
            parent_next(response.error);
        } else {
            EmailContentObject = {
                "Local": EmailObject.Local,
                "ReferenceId": EmailObject.ReferenceId,
                "EmailType":EmailObject.EmailType,
                "From": EmailObject.From,
                "SenderName": EmailObject.SenderName,
                "Subject": EmailObject.Subject,
                "UserId": EmailObject.UserId,
                "Content": response.content,
                "BulkEmailTimestamp": parseInt(EmailObject.BulkEmailTimestamp)
            }
            parent_next(null, EmailContentObject);
        }
    });
};

updateNewsletterStatus = function(EmailObject, status, parent_next) {
    if (EmailObject.EmailType === 'newsletter') {
        request({
            uri: initApi.getAPIURL(EmailObject.Local) + 'newslettercampaigns/' + EmailObject.ReferenceId + '?api_key=' + initApi.getAPIKey(),
            method: 'PUT',
            json: { 'scheduledStatus': status },
            headers: { 'content-type': 'application/json' }
        }, function(error, response, body) {
            response = apiResponseHandler.handleUpdateNewsletterStatusResponse(error, body);
            if (response.error) {
                parent_next(response);
            } else {
                parent_next(null, EmailObject);
            }
        });
    } else {
        parent_next(null, EmailObject);
    }
}

getApiCallEmailType = function(EmailType) {
    ApiCallEmailType = EmailType;
    if (EmailType == 'testnewsletter') {
        ApiCallEmailType = 'newsletter';
    }
    return ApiCallEmailType;
}
module.exports = {
    getNewsletterContent: getNewsletterContent,
    getNewsletterData: getNewsletterData,
    updateNewsletterStatus: updateNewsletterStatus
};
