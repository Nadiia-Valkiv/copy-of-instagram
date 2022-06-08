import { tableName } from '../utils/constants.js';
import AuthService from './AuthService.js';
import DataLayer from './DataLayer.js';

export default class UsersDataLayer extends DataLayer {
    constructor() {
        super();
        this.tableName = tableName;
        this.authService = new AuthService();
    }

    add(user) {
        console.log(this.authService.addUser(user));
    }

    get(username) {
        return this.authService.getUser(username);
    }

    getAll() {
        return this.authService.getAllUsers();
    }

    update(user) {}

    delete(username) {}
}
