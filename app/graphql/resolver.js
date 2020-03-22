const db = require("../database/db");
const service = require("../services/services");

module.exports = {

    users: ({id}) => {
        return id ? [service.User.get(id)] : service.User.get();
    },

    updateUser: ({id, name, password, phoneNumber, imageUrl}) => {
        if (id) {
            let obj = {};
            obj.id = id;
            if (name !== null) obj.name = name;
            if (password !== null) obj.password = password;
            if (phoneNumber !== null) obj.phoneNumber = phoneNumber;
            if (imageUrl !== null) obj.imageUrl = imageUrl;
            return service.User.update(id, obj);
        } else {
            return null;
        }
    },

    createUser: ({name, password, phoneNumber, imageUrl}) => {
        return service.User.create({name, password, phoneNumber, imageUrl});
    },

    deleteUser: ({id}) => {
        return service.User.delete(id);
    }
}
;