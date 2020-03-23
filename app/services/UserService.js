const User = require("../database/db").User;
const protect = require("../protect");

// without validation :)
class UserService {

    searchFields = {
        ID: "id",
        EMAIL: "email",
        PHONE: "phoneNumber",
    };
    /**
     * Create and save user to database
     * @param userObj - user data object
     * @returns {Promise<User>} - created user object
     */
    async create(userObj) {
        let user = new User(userObj);
        user.password = await protect.hashPassword(user.password);
        await user.save();
        return user;
    }

    async update(id, user) {
        const [updated] = await User.update(user, {where: {id}});
        if (updated) {
            return this.get(id);
        }
    }

    /**
     * Delete user by given 'id'
     * @param {Number} id - user id
     */
    async delete(id) {
        const deleted = await User.destroy({where: {id}});
        return !!deleted;
    }

    /**
     * Get user by given field and value if 'field' or 'value' are undefined return all users
     * @param field - field name
     * @param value - field value
     * @returns {Promise<any[]>|Promise<any | null>}
     */
    get(field, value) {
        if (value && field) {
            return User.findOne({where: {[field]: value}});
        } else {
            return User.findAll();
        }
    }
}

module.exports = UserService;