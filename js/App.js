import UsersDataLayer from './UsersDataLayer.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Modal from './Modal.js';
import { showHTMLElement } from './helpers.js';

export default class App {
    constructor() {
        this.usersDataLayer = new UsersDataLayer();
        this.loginForm = new Login('loginForm');
        this.signUpForm = new SignUp('registerForm');
        this.listOfUsers = null;
        this.modal = new Modal();
        this.addListenerForRegistrationButtons('loginButton', 'loginForm');
        this.addListenerForRegistrationButtons(
            'registerButton',
            'registerForm'
        );
    }

    addListenerForRegistrationButtons(buttonId, formId) {
        document.getElementById(buttonId).addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.showModal(formId);
        });
    }
}
