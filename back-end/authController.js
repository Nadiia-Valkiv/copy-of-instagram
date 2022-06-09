const User = require('./models/User.js');
const bcrypt = require('bcryptjs');

class AuthController {
    async registration(req, res) {
        try {
            console.log('user to save: ', req.body);
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res
                    .status(409)
                    .json({ message: 'User is already exist' });
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await new User({
                username,
                password: encryptedPassword,
            });
            await user.save();
            return res.json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async getUser(req, res) {
        try {
            const { username } = req.body;
            const user = await User.findOne({ username });
            console.log(user);
            if (user) {
                return res.status(200).json(user);
            } else {
                throw new Error('User not exist');
            }
        } catch (e) {
            console.log(e);
            res.status(200).json({ isUserNotExistMessage: 'User not exist' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            if (users) {
                return res.status(200).json(users);
            }
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'Can not find any user' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { username } = req.body;
            await User.deleteOne({username});
            return res.status(200).json({ message: 'User deleted' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Error deleting' });
        }
    }
}

module.exports = new AuthController();
