import UsersDataLayer from './UsersDataLayer.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import { showHTMLElement } from './helpers.js';

export default class App {
    constructor() {
        this.usersDataLayer = new UsersDataLayer();
        this.loginForm = new Login('loginForm');
        this.signUpForm = new SignUp('registerForm');
        this.listOfUsers = null;
        this.addListenerForRegistrationButtons('loginButton', 'login');
        this.addListenerForRegistrationButtons('registerButton', 'register');
    }

    addListenerForRegistrationButtons(elementId, idElementToStyled) {
        document
            .getElementById(elementId)
            .addEventListener(
                'click',
                () => showHTMLElement(idElementToStyled),
                false
            );
    }
}
