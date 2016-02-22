var AWS, DOC, docClient, awsClient, getRecords, putRecord, _, UpdateStatusInBulkEmail;
_ = require('lodash');
AWS = require("aws-sdk");
DOC = require("dynamodb-doc");
AWS.config.update({ region: "us-west-2" });

awsClient = new AWS.DynamoDB();
docClient = new DOC.DynamoDB(awsClient);

getRecords = function(tableName, conditions, next) {
    params = {};
    params.TableName = tableName;
    params.KeyConditions =  [];
    _.forEach(conditions, function(condition, key) {
        console.log(condition);
        params.KeyConditions.push(docClient.Condition(condition[0], condition[1], condition[2]));
    });

    docClient.query(params, function(err, data) {
        console.log("called");
        console.log(err);
        console.log(data);
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
        next();
    });
};

putRecord = function(emailContentObject, next) {
    params = {};
    params.TableName = "BulkEmailContent";
    params.Item = {
        "Local": emailContentObject.Local,
        "Timestamp": new Date().getTime(),
        "ReferenceId": parseInt(emailContentObject.ReferenceId),
        "EmailType": emailContentObject.EmailType,
        "BulkEmailTimestamp":  parseInt(emailContentObject.BulkEmailTimestamp),
        "Email": {
            "From":  emailContentObject.From,
            "SenderName":  emailContentObject.SenderName,
            "UserId": emailContentObject.UserId,
            "Content": emailContentObject.Content,
            "Subject":emailContentObject.Subject
        }
    };
    docClient.putItem(params, function(err, data) {
        if (err) {
            next(err);
        } else {
            next();
        }
    });

};

UpdateStatusInBulkEmail = function(emailContentObject, next) {
    params = {};
    params.TableName = "BulkEmail";
    params.Item = {
        "Local": emailContentObject.Local,
        "Timestamp": parseInt(emailContentObject.BulkEmailTimestamp),
        "ReferenceId": parseInt(emailContentObject.ReferenceId),
        "EmailType": emailContentObject.EmailType,
        "ScheduledStatus": "triggered"
    };
    docClient.putItem(params, function(err, data) {
        if (err) {
            next(err);
        } else {
            next(null, emailContentObject);
        }
    });

};

module.exports = {
    getRecords: getRecords,
    putRecord: putRecord,
    UpdateStatusInBulkEmail: UpdateStatusInBulkEmail
};
