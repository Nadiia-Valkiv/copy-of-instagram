import Form from './Form.js';
import { app } from './main.js';
import {
    loginButtonId,
    loginPleaseRegisterMessage,
    loginSuccessfullyMessage,
    loginPasswordIncorrectMessage,
} from './constants.js';
class Login extends Form {
    constructor(formID) {
        super(formID);
        this.passwordIsMatch = undefined;
        this.addListenerForButtonActions(
            loginButtonId,
            this.userLogin.bind(this)
        );
        this.userPassword = null;
    }

    userLogin(e) {
        e.preventDefault();
        if (this.isFormDataValid()) {
            if (this.isUserExist()) {
                this.checkUsersPassword();
                app.modal.closeModal('loginForm');
                console.log(this.getEmail());
                this.performActionsOnLogin();
            } else {
                console.log(loginPleaseRegisterMessage);
            }
        } else {
            console.log('invalid data');
        }
    }

    getUserPassword() {
        let result = undefined;
        const userInDB = app.usersDataLayer.get(this.getEmail());
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
        this.userPassword = this.getUserPassword();
        return this.userPassword === this.getPassword();
    }

    getUpdatedLoggedUser() {
        return {
            [this.getEmail()]: {
                password: this.getPassword(),
            },
        };
    }
}

export default Login;
