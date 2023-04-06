const {generateFakeUser} = require("./mock") 
const model = require("./model");

const Staff = model.Staff;

const StaffCRUD = {
    create:(userBody) => {
        const newUser = Staff(generateFakeUser(userBody));
        return newUser.save()
    },
    read:(staffId) => {
        if (staffId === undefined) return Staff.find().exec();
        return Staff.findById(staffId).exec()
    },
    update:(staffId, updateBody) => {
        return Staff.findByIdAndUpdate(staffId, updateBody);
    },
    delete:(staffId) => {
        return Staff.findByIdAndDelete(staffId);
    }
}

module.exports = StaffCRUD