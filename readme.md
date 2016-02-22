# Email Activity Reporter
This repository contains the node js code for AWS Lambda function to handle the API calls for getting bulk email content composer data.
This function gets invoked when there is an event registered on BulkEmail Table



###Workflow
Workflow of the library:

1. New record is added in BulkEmail table.
2. Triggers the function
3. Function check for the EmailType
4. Depending on the EmailType api call will be given to get the email content.
5. Add new record in BulkEmailContent table using dynamoDB


### Version
1.0.0

### deployment steps 
- You need Grunt installed globally:

```sh
    $ npm install -g grunt
```
- Take the clone of the repository

- install npm packages
```sh
    $ npm install
```
- create .env file with the following settings

    *  KORTINGSCODE_API_URL  = URL
    *  FLIPIT_API_URL       = URL
    *  API_KEY              = API_KEY

- follow the gruntfile.js for the various available commands


