import 'babel-polyfill';
import * as dynamo from "./utils/dynamo"

export const createUser = async(event, context, callback) => {
    const body = JSON.parse(event.body);
    try {
        await dynamo.createUser(body);
        callback(null, sendSuccess({message: "User Created Successfully"}))
    } catch (err) {
        callback(null, sendError(403, err.message))
    }
};

export const listUser = async(event, context, callback) => {
    try {
        const data = await dynamo.listUser();
        callback(null, sendSuccess(data))
    } catch (err) {
        callback(null, sendError(403, err.message))
    }
};

export const updateUser = async(event, context, callback) => {
    const body = JSON.parse(event.body);
    const id = event.pathParameters.id
    try {
        const data = await dynamo.updateUser(id, body);
        callback(null, sendSuccess(data))
    } catch (err) {
        callback(null, sendError(403, err.message))
    }
};

export const deleteUser = async(event, context, callback) => {
    const id = event.pathParameters.id
    try {
        await dynamo.deleteUser(id);
        callback(null, sendSuccess({message: "User Deleted Successfully"}))
    } catch (err) {
        callback(null, sendError(403, err.message))
    }
};

const sendSuccess = (data) => ({
    statusCode: 200,
    body: JSON.stringify(data)
})

const sendError = (statusCode, message) => ({
    statusCode: statusCode || 500,
    headers: {'Content-Type': 'text/plain'},
    body: message,
});

