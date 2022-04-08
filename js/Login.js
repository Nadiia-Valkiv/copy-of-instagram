import Form from './Form.js';
import { app } from './main.js';
import {
    loginSuccessfullyMessage,
    loginPasswordIncorrectMessage,
} from './constants.js';

class Login extends Form {
    constructor(email, password, formID) {
        super(email, password, formID);
        this.passwordIsMatch = undefined;
        this.userPassword = this.getUserPassword();
    }

    getUserPassword() {
        let result = undefined;
        const userInDB = app.usersDataLayer.get(this.email);
        if (userInDB !== undefined) {
            result = userInDB.password;
        }
        return result;
    }

    checkUsersPassword() {
        if (this.isUserExist()) {
            if (this.checkIsPasswordCorrect()) {
                this.passwordIsMatch = true;
                app.usersDataLayer.add(
                    this.getUpdatedLoggedUser(true),
                    app.usersDataLayer.tableName
                );
                console.log(loginSuccessfullyMessage);
            } else {
                this.passwordIsMatch = false;
                console.log(loginPasswordIncorrectMessage);
            }
            return this.passwordIsMatch;
        }
    }

    checkIsPasswordCorrect() {
        return this.userPassword === this.password;
    }

    getUpdatedLoggedUser(isLogin) {
        return {
            [this.email]: {
                password: this.password,
                isLogin: isLogin,
            },
        };
    }
}

export default Login;
