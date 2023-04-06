const { faker } = require('@faker-js/faker');

// const randomName = faker.name.fullName(); // Rowan Nikolaus
// const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

const generateFakeUser = (userBody) => {
    return populateFields(userBody)
}

const populateFields = (userBody) => {
    const validatedUserBody = {...userBody}
    if (validatedUserBody.position === undefined) {
        validatedUserBody.position = faker.name.jobTitle()
    }
    if (validatedUserBody.lastName === undefined) {
        validatedUserBody.lastName = faker.name.lastName()
    }
    if (validatedUserBody.firstName === undefined) {
        validatedUserBody.firstName = faker.name.firstName()
    }
    if (validatedUserBody.department === undefined) {
        validatedUserBody.department = faker.commerce.department()
    }
    return validatedUserBody;
}

exports.generateFakeUser = generateFakeUser;
exports.populateFields = populateFields;