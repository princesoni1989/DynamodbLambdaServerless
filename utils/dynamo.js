import AWS from "aws-sdk";
import uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function createUser(data, callback) {
    const timestamp = new Date().getTime();
    const params = {
        TableName: process.env.USER_TABLE,
        Item: {
            id: uuid.v1(),
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: timestamp,
            updatedAt: timestamp,
        },
    };

    return dynamoDb.put(params).promise();
}


export function listUser() {
    const params = {
        TableName: process.env.USER_TABLE,
    };

    return dynamoDb.scan(params).promise();
}

export function updateUser(id, data) {
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {id},
        ExpressionAttributeValues: {
            ':email': data.email,
            ':password': data.password,
        },
        UpdateExpression: 'SET email = :email, password = :password',
        ReturnValues: 'UPDATED_NEW',
    };
    return dynamoDb.update(params).promise();
}


export function deleteUser(id) {
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {id}
    };
    return dynamoDb.delete(params).promise();
}
