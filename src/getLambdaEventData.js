var getEmailType, getEventName, getEventRecords, getTimestamp, getLocal, getReferenceId;

getEventRecords = function(event, next) {
    var eventRecords = (event.Records) ? event.Records : '';
    if ( typeof eventRecords === 'undefined' || eventRecords === '') {
        next("Invalid Records");
    } else {
        return eventRecords;
    }
}

getEventName = function(record, next) {
    var EventType = (record.eventName) ? record.eventName : '';
    if ( typeof EventType === 'undefined' || EventType === '') {
        next("Event name is not valid");
    } else {
        return EventType;
    }
}

getEmailType = function(record, next) {
    var EmailType = (record.dynamodb.NewImage.EmailType.S) ? record.dynamodb.NewImage.EmailType.S : '';
    if ( typeof EmailType === 'undefined' || EmailType === '') {
        next("EmailType is not valid");
    } else {
        return EmailType;
    }
}

getLocal = function(record, next) {
    var local = (record.dynamodb.NewImage.Local.S) ? record.dynamodb.NewImage.Local.S : '';
    if ( typeof local === 'undefined' || local === '') {
        next("local is not valid");
    } else {
        return local;
    }
}

getReferenceId = function(record, next) {
    var ReferenceId = (record.dynamodb.NewImage.ReferenceId.N) ? record.dynamodb.NewImage.ReferenceId.N : '';
    if ( typeof ReferenceId === 'undefined' || ReferenceId === '') {
        next("ReferenceId is not valid");
    } else {
        return ReferenceId;
    }
}

getTimestamp = function(record, next) {
    var BulkEmailTimestamp = (record.dynamodb.NewImage.Timestamp.N) ? record.dynamodb.NewImage.Timestamp.N : '';
    if ( typeof BulkEmailTimestamp === 'undefined' || BulkEmailTimestamp === '') {
        next("BulkEmailTimestamp is not valid");
    } else {
        return BulkEmailTimestamp;
    }
}

getUserId = function(record, next) {
    if (typeof record.dynamodb.NewImage.UserId === 'undefined') {
        next("UserId is not valid");
    } else {
        var UserId = (record.dynamodb.NewImage.UserId.N) ? record.dynamodb.NewImage.UserId.N : '';
        if (typeof UserId === 'undefined' || UserId === '') {
            next("UserId is not valid");
        } else {
            return UserId;
        }
    }
}
module.exports = {
    getEventRecords: getEventRecords,
    getEventName: getEventName,
    getEmailType:getEmailType,
    getLocal:getLocal,
    getReferenceId:getReferenceId,
    getTimestamp:getTimestamp,
    getUserId:getUserId
};
