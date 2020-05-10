'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  const params = {
    TableName: "Goals",
    Key: {
      id: id
    }
  }

  try{

    const data = await documentClient.delete(params).promise(); //From AWS library - promisifies any AWS function call
    responseBody = JSON.stringify(data); //Holds response as a string
    statusCode = 204;

  } catch(err){
    responseBody = `Unable to delete goal: ${err}`;
    statusCode = 403;
  }

  const response ={
    statusCode: statusCode,
    headers: {
      "Content-Type" : "applications/json",
      "access-control-allow-origin" : "*"
    },
    body: responseBody
  }

  return response;
}