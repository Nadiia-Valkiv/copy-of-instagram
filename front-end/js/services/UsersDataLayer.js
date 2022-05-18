import { tableName } from '../utils/constants.js';
import DataLayer from './DataLayer.js';

export default class UsersDataLayer extends DataLayer {
    constructor() {
        super();
        this.tableName = tableName;
    }

    add(userData, tableName) {
        const result = { ...this.getAll(tableName), ...userData };
        return localStorage.setItem(tableName, JSON.stringify(result));
    }
    get(key) {
        return super.get(key, this.tableName);
    }
}
