const User = require('./models/User.js');
const Role = require('./models/Role.js');

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
            const userRole = await Role.findOne({ value: 'USER' });
            const user = await new User({
                username,
                password: password,
                roles: [userRole.value],
            });
            await user.save();
            return res.json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            console.log('finding user:', req.body);
            const { username } = req.body;
            const user = await User.findOne({ username });
            console.log(user)
            if (user) {
                return res.status(200).json(user);
            }
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'User not exist' });
        }
    }

    async getUsers(req, res) {
        try {
            console.log('finding users:', req);
            const users = await User.find();
            if (users) {
                return res.status(200).json(users);
            }
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'Can not find any user' });
        }
    }
}

module.exports = new AuthController();
