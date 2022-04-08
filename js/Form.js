import { app } from './main.js';

class Form {
    constructor(email, password, formID) {
        this.email = email;
        this.password = password;
        this.isExist = this.isUserExist();
        this.formElement = document.getElementById(formID);
    }

    isUserExist() {
        let usersData = app.usersDataLayer.getAll(app.usersDataLayer.tableName);
        return Object.keys(usersData).includes(this.email);
    }

    isEmptyInputData(inputValue) {
        return inputValue.length === 0;
    }

    isFormDataValid() {
        let inputs = this.formElement.querySelectorAll('input');
        inputs.forEach((element) => this.checkValidInput(element));

        return this.formElement.checkValidity();
    }

    checkValidInput(input) {
        if (!input.checkValidity()) {
            input.nextElementSibling.innerText = input.dataset.errorMessage;
        } else {
            input.nextElementSibling.innerText = '';
        }
    }
}

export default Form;
