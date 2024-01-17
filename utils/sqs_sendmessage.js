require('dotenv').config();
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const { SQS } = require("@aws-sdk/client-sqs");
// const { Credentials } = require("@aws-sdk/types");
console.log("AWS: ", process.env.AWS_ACCESS_KEY_ID);
const awsCredentials = new AWS.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});



// Create an SQS service object
var sqs = new SQS({
  credentials: awsCredentials, 
  region: 'us-east-1'
});

var params = {
   // Remove DelaySeconds parameter and value for FIFO queues
  DelaySeconds: 10,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Whistler"
    },
    "Author": {
      DataType: "String",
      StringValue: "John Grisham"
    },
    "WeeksOn": {
      DataType: "Number",
      StringValue: "6"
    }
  },
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: "https://sqs.us-east-1.amazonaws.com/106022474758/SieveQueue"
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
