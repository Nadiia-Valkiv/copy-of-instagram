import UsersDataLayer from './services/UsersDataLayer.js';
import Login from './forms/Login.js';
import SignUp from './forms/SignUp.js';
import Modal from './utils/Modal.js';
import Router from './router/Router.js';
import UsersList from './services/UsersList.js';
import { hideHTMLElement, showHTMLElement } from './utils/helpers.js';

export default class App {
    constructor() {
        this.router = new Router();
        this.usersDataLayer = new UsersDataLayer();
        this.loginForm = new Login('loginForm');
        this.signUpForm = new SignUp('registerForm');
        this.loginForm = null;
        this.listOfUsers = null;
        this.modal = new Modal('modal1', 'test-modal-content');
        this.addListenerForRegistrationButtons('loginButton', 'loginForm');
        this.addListenerForRegistrationButtons(
            'registerButton',
            'registerForm'
        );
        this.addLogOutListener();
        this.onLoad();
    }

    addListenerForRegistrationButtons(buttonId, formId) {
        document.getElementById(buttonId).addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.showModal(formId);
        });
    }

    onLoad() {
        window.addEventListener('load', async () => {
            if (this.checkIsTokenExist()) {
                this.listOfUsers = new UsersList();
                if (!this.listOfUsers.showListOfUsers()) {
                    showHTMLElement('loginButton');
                showHTMLElement('registerButton');
                    console.log('Token is invalid');
                } else {
                      hideHTMLElement('loginButton');
                hideHTMLElement('registerButton');
                showHTMLElement('logout');
                    console.log('test2');
                }

                
            } else {
                showHTMLElement('loginButton');
                showHTMLElement('registerButton');
            }
        });
    }

    checkIsTokenExist() {
        return localStorage.getItem('jwt');
    }

    addLogOutListener() {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('jwt');
            location.reload();
        });
    }
}
