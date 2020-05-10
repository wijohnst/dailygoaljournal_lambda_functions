'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {id, description, creationDate, benchmarks} = JSON.parse(event.body);

  const params = {
    TableName: "Goals",
    Item: {
      id: id,
      description : description,
      creationDate: creationDate,
      benchmarks : benchmarks
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
      "Content-Type" : "applications/json",
      "access-control-allow-origin" : "*",
    },
    body: responseBody
  }

  return response;
}