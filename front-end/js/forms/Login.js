import Form from './Form.js';
import { app } from '../main.js';
import {
    loginButtonId,
    loginPleaseRegisterMessage,
    loginSuccessfullyMessage,
    loginPasswordIncorrectMessage,
} from '../utils/constants.js';

class Login extends Form {
    constructor(formID) {
        super(formID);
        this.addListenerForButtonActions(
            loginButtonId,
            this.userLogin.bind(this)
        );
    }

    userLogin(e) {
        e.preventDefault();
        if (this.isFormDataValid()) {
            this.isUserExist(this.getEmail()).then((data) => {
                if (data.isUserNotExistMessage) {
                    console.log(loginPleaseRegisterMessage);
                } else {
                    if (this.checkIsPasswordCorrect(data.password)) {
                        console.log(loginSuccessfullyMessage);
                        app.modal.closeModal('loginForm');
                        this.performActionsOnLogin();
                    } else {
                        console.log(loginPasswordIncorrectMessage);
                    }
                }
            });
        } else {
            console.log('invalid data in form');
        }
    }

    checkIsPasswordCorrect(userPasswordInDB) {
        return userPasswordInDB === this.getPassword();
    }
}

export default Login;
