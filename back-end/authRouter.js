const Router = require('express');
const router = new Router();
const controller = require('./authController.js')

router.post('/registration', controller.registration);
router.post('/login', controller.getUser);
router.get('/users', controller.getUsers);
router.delete('/delete', controller.deleteUser);
router.post('/authentication', controller.login);

module.exports = router;
