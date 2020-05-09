'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {id, description} = JSON.parse(event.body);

  const params = {
    TableName: "Goals",
    Goal: {
      id: id,
      description: description
  }
};

  try{

    const data = await documentClient.put(params).promise(); //From AWS library - promisifies any AWS function call
    responseBody = JSON.stringify(data); //Holds response as a string
    statusCode = 201;

  } catch(err){
    responseBody = `Unable to put goal: ${err}`;
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