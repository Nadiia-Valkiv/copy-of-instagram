const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const RSA256_PRIVATE_KEY = fs.readFileSync('rs256/jwtRS256.key');
const jwtExpiryTime = '1y';
const saltForPassword = 10;

class AuthController {
    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res
                    .status(409)
                    .json({ message: 'User is already exist' });
            }

            const encryptedPassword = await bcrypt.hash(
                password,
                saltForPassword
            );
            const user = await new User({
                username,
                password: encryptedPassword,
            });
            await user.save();
            const jwtToken = jwt.sign(
                        { username },
                        RSA256_PRIVATE_KEY,
                        {
                            expiresIn: jwtExpiryTime,
                        }
                    );
                    console.log('token: ' + jwt);
                    return res.status(200).json({
                        user,
                        jwt: { token: jwtToken, expiresIn: jwtExpiryTime },
                    });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const userInDB = await User.findOne({ username });
            bcrypt.compare(password, userInDB.password, (err, data) => {
                if (err) {
                    console.log(err);
                }
                if (data) {
                    const jwtToken = jwt.sign(
                        { username },
                        RSA256_PRIVATE_KEY,
                        {
                            expiresIn: jwtExpiryTime,
                        }
                    );
                    return res.status(200).json({
                        username: username,
                        msg: true,
                        jwt: { token: jwtToken, expiresIn: jwtExpiryTime },
                    });
                } else {
                    return res.status(401).json({ msg: false });
                }
            });
        } catch (e) {
            console.log(e);
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
            const bearerHeader = req.headers['authorization'];
            if (typeof bearerHeader !== 'undefined') {
                const bearerToken = bearerHeader.split(' ')[1];
                jwt.verify(bearerToken, RSA256_PRIVATE_KEY, async (err) => {
                    if (err) {
                        return res.status(403).json({message: 'Token not valid'});
                    } else {
                        const users = await User.find();
                        if (users) {
                            return res.status(200).json(users);
                        }
                    }
                });
            } else {
                return res.status(403);
            }

            
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'Can not find any user' });
        }
    }

    async deleteUser(req, res) {
        try {
            const { username } = req.body;
            await User.deleteOne({ username });
            return res.status(200).json({ message: 'User deleted' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Error deleting' });
        }
    }
}

module.exports = new AuthController();
