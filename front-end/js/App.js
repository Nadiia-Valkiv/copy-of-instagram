import UsersDataLayer from './services/UsersDataLayer.js';
import DataLayer from './services/DataLayer.js';
import Login from './forms/Login.js';
import SignUp from './forms/SignUp.js';
import Modal from './utils/Modal.js';
import Router from './router/Router.js';
import UsersList from './services/UsersList.js';
import { hideHTMLElement, showHTMLElement } from './utils/helpers.js';
import AuthService from './services/AuthService.js';

export default class App {
    constructor() {
        this.router = new Router();
        this.dataLayer = new DataLayer();
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
            this.usersDb = await this.usersDataLayer.getAll();
            console.log(this.usersDb);
            if (this.checkIsTokenValid()) {
                hideHTMLElement('loginButton');
                hideHTMLElement('registerButton');
                showHTMLElement('logout');
                this.listOfUsers = new UsersList();
                this.listOfUsers.showListOfUsers();
            } else {
                showHTMLElement('loginButton');
                showHTMLElement('registerButton');
            }
        });
    }

    checkIsTokenValid() {
        const loggedInUser = this.dataLayer.getAll('token');
        const registeredUser = Object.keys(this.dataLayer.getAll('Users'));
        return registeredUser.includes(loggedInUser);
    }

    addLogOutListener() {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            location.reload();
        });
    }
}
