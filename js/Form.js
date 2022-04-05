import {app} from './main.js';

class Form {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.isExist = this.isUserExist();
    }

    isUserExist() {
        let usersData = app.usersDataLayer.getAll(app.usersDataLayer.tableName);
        return Object.keys(usersData).includes(this.email);
    }

    isEmptyInputData(inputValue) {
        return inputValue.length === 0;
    }
}

export default Form;
