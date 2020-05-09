'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {id, description} = JSON.parse(event.body);

  const params = {
    TableName: "Goals",
    Key: {
      id: id,
    },
    UpdateExpression: "set description = :d",
    ExpressionAttributeValues: {
      ":d" : description
    },
    ReturnValues: "UPDATED_NEW"
  }

  try{

    const data = await documentClient.update(params).promise(); //From AWS library - promisifies any AWS function call
    responseBody = JSON.stringify(data); //Holds response as a string
    statusCode = 204;

  } catch(err){
    responseBody = `Unable to update goal: ${err}`;
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