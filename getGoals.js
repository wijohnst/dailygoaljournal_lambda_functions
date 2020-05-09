'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Goals"
  }

  try{

    const data = await documentClient.scan(params).promise(); //From AWS library - promisifies any AWS function call
    responseBody = JSON.stringify(data.Items); //Holds response as a string
    statusCode = 200;

  } catch(err){
    responseBody = `Unable to get goals: ${err}`;
    statusCode = 403;
  }

  const response ={
    statusCode: statusCode,
    headers: {
      "Content-Type" : "applications/json"
    },
    body: responseBody
  }

  return response;
}