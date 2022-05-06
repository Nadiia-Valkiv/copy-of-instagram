import UsersDataLayer from './UsersDataLayer.js';
import DataLayer from './DataLayer.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Modal from './Modal.js';
import Router from './Router.js';
import UsersList from './UsersList.js';

export default class App {
    constructor() {
        this.router = new Router();
        this.dataLayer = new DataLayer();
        this.usersDataLayer = new UsersDataLayer();
        this.loginForm = new Login('loginForm');
        this.signUpForm = new SignUp('registerForm');
        this.listOfUsers = null;
        this.modal = new Modal('modal1', 'test-modal-content');
        this.addListenerForRegistrationButtons('loginButton', 'loginForm');
        this.addListenerForRegistrationButtons(
            'registerButton',
            'registerForm'
        );
        this.addLogOutListener()
        this.onLoad();

    }

    addListenerForRegistrationButtons(buttonId, formId) {
        document.getElementById(buttonId).addEventListener('click', (e) => {
            e.preventDefault();
            this.modal.showModal(formId);
        });
    }

    onLoad() {
        window.addEventListener('load', () => {
            if (this.checkIsTokenValid()) {
                this.listOfUsers = new UsersList();
                this.listOfUsers.showListOfUsers();
            }
        });
    }

    checkIsTokenValid() {
        let result = this.dataLayer.getAll('token').length;
        return result > 0 ? true : false;
    }

    addLogOutListener() {
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            location.reload();
        });
    }
}
