const User = require("../database/db").User;
const protect = require("../protect");

// without validation :)
class UserService {

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
     * Get user by given 'id', if 'id' is undefined return all users
     * @param {Number?} id - user id
     * @returns {Promise<any[]>|Promise<any | null>}
     */
    get(id) {
        if (id) {
            return User.findOne({where: {id}});
        } else {
            return User.findAll();
        }
    }
}

module.exports = UserService;