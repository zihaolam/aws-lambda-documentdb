const mongoose = require("mongoose")
const StaffCRUD = require("./crud");
const {populateFields} = require("./mock");


let connection = null;

const buildResponse = (statusCode, body) => {
    return {
        statusCode,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        }
    }
}

const mongoConnect = async () => {
    if (connection) return;
    try {
        connection = await mongoose.connect(process.env.MONGO_URI, {tlsCAFile: "mongo-public-key.pem"});   
        return connection;
    }
    catch (err) {
        console.log("connection error: ", err)
    }
}

const checkValidId = (userId) => mongoose.Types.ObjectId.isValid(userId);

exports.handler = async (event, context) => {
    await mongoConnect();
    const routeKey = event.httpMethod + ' ' + event.resource;
    try {
        switch (routeKey) {
            case "DELETE /user/{id}":
                var isIdValid = checkValidId(event.pathParameters.id);
                if (!isIdValid) return buildResponse(404, {message: "Id not found/InvalidId", action: "Failed"})

                const isDeleted = await StaffCRUD.delete(event.pathParameters.id)

                if (!isDeleted) return buildResponse(404, {message: "Id not found/InvalidId", action: "Failed"})
                return buildResponse(200, `Deleted item ${event.pathParameters.id}`)

            case "GET /user/{id}":
                var isIdValid = checkValidId(event.pathParameters.id);
                if (!isIdValid) return buildResponse(404, {message: "Id not found/InvalidId", action: "Failed"})

                const _staffFound = await StaffCRUD.read(event.pathParameters.id);
                if (_staffFound === null) return buildResponse(404, "Staff not found");

                return buildResponse(200, _staffFound)


            case "GET /user":
                const users = await StaffCRUD.read();

                return buildResponse(200, users)

            case "PUT /user/{id}":
                var isIdValid = checkValidId(event.pathParameters.id);
                if (!isIdValid) return buildResponse(404, {message: "Invalid ID", action: "Failed"})
                var updateBody = JSON.parse(event.body);

                const isUpdated = await StaffCRUD.update(event.pathParameters.id, updateBody)

                if (!isUpdated) return buildResponse(404, { message: "Invalid ID", action: "Failed"})
                const updatedUser = await StaffCRUD.read(event.pathParameters.id);

                return buildResponse(200, {action: "Success", message: `Updated Item ${event.pathParameters.id}`, updatedUser})

            case "POST /user":
                var userBody = JSON.parse(event.body);
                const newUser = await StaffCRUD.create(userBody)
                return buildResponse(200, {action: "Success", message: `Created New Item ${newUser.id}`, newUser})

            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
            }

        } catch (err) {
            statusCode = 400;
            body = err.message;
        }

    return buildResponse(200, body)
}