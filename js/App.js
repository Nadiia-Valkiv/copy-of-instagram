import {
    click,
    signUpButtonId,
    signUpEmailId,
    signUpPsw1Id,
    signUpPsw2Id,
    signUpSuccessfullyMessage,
    signUpInvalidDataMessage,
    signUpHaveAccountMessage,
    loginButtonId,
    loginEmailId,
    loginPswId,
    loginPleaseRegisterMessage,
} from './constants.js';
import UsersDataLayer from './UsersDataLayer.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import UsersList from './UsersList.js';

export default class App {
    constructor() {
        this.usersDataLayer = new UsersDataLayer();
        this.listOfUsers = null;
        this.addListenerForRegistrationButtons('loginButton', 'login', 'block');
        this.addListenerForRegistrationButtons(
            'registerButton',
            'register',
            'block'
        );
        this.addListenerForRegistrationButtons(
            'loginFormCross',
            'login',
            'none'
        );
        this.addListenerForRegistrationButtons(
            'registerFormCross',
            'register',
            'none'
        );
        this.addListenerForButtonActions(
            signUpButtonId,
            this.saveRegistrationData.bind(this)
        );
        this.addListenerForButtonActions(
            loginButtonId,
            this.userLogin.bind(this)
        );
    }

    addListenerForRegistrationButtons(elementId, idElementToStyled, property) {
        document
            .getElementById(elementId)
            .addEventListener(
                'click',
                () =>
                    this.changeDisplayCssProperty(idElementToStyled, property),
                false
            );
    }

    changeDisplayCssProperty(idElementToStyled, property) {
        document.getElementById(idElementToStyled).style.display = property;
    }

    addListenerForButtonActions(buttonId, func) {
        document
            .getElementById(buttonId)
            .addEventListener('click', (e) => func(e));
    }

    saveRegistrationData(event) {
        event.preventDefault();
        //todo: create a method to check is two passwords are identical
        const signUp = new SignUp(
            document.getElementById(signUpEmailId).value,
            document.getElementById(signUpPsw1Id).value,
            'registerForm',
            document.getElementById(signUpPsw2Id).value
        );
        if (signUp.isFormDataValid()) {
            if (signUp.isUserExist(this.usersDataLayer)) {
                console.log(signUpHaveAccountMessage);
            } else {
                if (signUp.isAllDataValid()) {
                    this.usersDataLayer.add(
                        signUp.createNewUser(),
                        this.usersDataLayer.tableName
                    );
                    console.log(signUpSuccessfullyMessage);
                    this.changeDisplayCssProperty('register', 'none');
                } else {
                    console.log(signUpInvalidDataMessage);
                }
            }
        } else {
            console.log('invalid data');
        }
    }

    userLogin(e) {
        e.preventDefault();
        const loginForm = new Login(
            document.getElementById(loginEmailId).value,
            document.getElementById(loginPswId).value,
            'loginForm'
        );
        if (loginForm.isFormDataValid()) {
            // loginForm.isFormDataValid()
            if (loginForm.isUserExist()) {
                loginForm.checkUsersPassword();
                this.changeDisplayCssProperty('login', 'none');
                this.listOfUsers = new UsersList();
                this.listOfUsers.showListOfUsers();
            } else {
                console.log(loginPleaseRegisterMessage);
            }
        } else {
            console.log('invalid data');
        }
    }

    closeListOfUsers() {
        let block = document.getElementsByClassName('list-of-users')[0];
        block.style.display = 'none';
    }
}
