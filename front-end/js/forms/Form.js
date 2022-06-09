import { app } from '../main.js';
import UsersList from '../services/UsersList.js';
import { hideHTMLElement, showHTMLElement } from '../utils/helpers.js';

class Form {
    constructor(formID) {
        this.formElement = document.getElementById(formID);
        this.email = this.getEmail;
        this.password = this.getPassword;
    }
    
    addListenerForButtonActions(buttonId, func) {
        document
            .getElementById(buttonId)
            .addEventListener('click', (e) => func(e));
    }

    getEmail() {
        return this.formElement.querySelectorAll('input[type=email]')[0].value;
    }

    getPassword() {
        return this.formElement.querySelectorAll('input[type=password]')[0]
            .value;
    }

    async isUserExist(username) {
        return app.usersDataLayer.get(username);
    }

    isFormDataValid() {
        let inputs = this.formElement.querySelectorAll('input');
        inputs.forEach((element) => this.checkValidInput(element));
        return this.formElement.checkValidity();
    }

    checkValidInput(input) {
        if (input.type === 'email') {
            const lettersPattern = /^[a-z0-9./-/_%+@]+$/;
            if (input.value.match(lettersPattern)) {
                this.checkValidInputEmail(input);
            } else {
                input.nextElementSibling.innerText =
                    'only latin letters allowed';
                input.nextElementSibling.classList.add('error-message');
            }
        }
    }

    checkValidInputEmail(input) {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (input.value.match(emailPattern)) {
            input.nextElementSibling.innerText = '';
        } else {
            input.nextElementSibling.innerText = 'invalid email';
            input.nextElementSibling.classList.add('error-message');
        }
    }

    performActionsOnLogin() {
        // here was a token
        hideHTMLElement('loginButton');
        hideHTMLElement('registerButton');
        showHTMLElement('logout');
        window.location.hash = '#/';
        app.listOfUsers = new UsersList();
        app.listOfUsers.showListOfUsers();
    }

    isEmptyInputData(inputValue) {
        return inputValue.length === 0;
    }
}

export default Form;
