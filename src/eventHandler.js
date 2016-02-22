var handleEventType, handleEmailType, getLambdaEventData;

getLambdaEventData = require('./getLambdaEventData');

handleEventType = function(EventType, record, next, callback) {
    if (EventType == "INSERT") {
        next(null, record);
    } else {
        console.log("No handling for " + EventType + " type of trigger. Stopping this execution.\n------------------\n");
        callback();
    }
}

handleEmailType = function(EmailType, record, next, callback) {
    if (EmailType == "newsletter" || EmailType == "testnewsletter") {
        next(null, record, EmailType);
    } else {
        console.log("No handling for " + EmailType + " type of email. Stopping this execution.\n------------------\n");
        callback();
    }
}

module.exports = {
    handleEventType: handleEventType,
    handleEmailType: handleEmailType
};
