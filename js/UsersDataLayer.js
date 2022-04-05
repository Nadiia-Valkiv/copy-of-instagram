import DataLayer from './DataLayer.js';
import { tableName } from './constants.js';

export default class UsersDataLayer extends DataLayer {
    constructor() {
        super();
        this.tableName = tableName;
    }
    get(key) {
        return super.get(key, this.tableName);
    }
}
