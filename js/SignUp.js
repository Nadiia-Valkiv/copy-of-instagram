import Form from './Form.js';
import { app } from './main.js';
import {
    signUpButtonId,
    signUpSuccessfullyMessage,
    signUpInvalidDataMessage,
    signUpHaveAccountMessage,
} from './constants.js';
import UsersList from './UsersList.js';

export default class SignUp extends Form {
    constructor(formID) {
        super(formID);
        this.confirmPassword = this.getConfirmPassword();
        this.addListenerForButtonActions(
            signUpButtonId,
            this.saveRegistrationData.bind(this)
        );
    }

    getConfirmPassword() {
        return this.formElement.querySelectorAll('input[type=password]')[1]
            .value;
    }

    saveRegistrationData(event) {
        event.preventDefault();
        if (this.isFormDataValid()) {
            if (this.isUserExist(app.usersDataLayer)) {
                console.log(signUpHaveAccountMessage);
            } else {
                if (this.isAllDataValid()) {
                    app.usersDataLayer.add(
                        this.createNewUser(),
                        app.usersDataLayer.tableName
                    );
                    console.log(signUpSuccessfullyMessage);
                    app.modal.closeModal('registerForm');
                    app.listOfUsers = new UsersList();
                    app.listOfUsers.showListOfUsers();
                } else {
                    console.log(signUpInvalidDataMessage);
                }
            }
        } else {
            console.log('invalid data');
        }
    }

    createNewUser() {
        if (this.isAllDataValid) {
            return {
                [this.getEmail()]: {
                    password: this.getPassword(),
                    isLogin: false,
                },
            };
        } else {
            console.log('Can not create new user. Provided data is invalid');
        }
    }

    validationEmail() {
        let errorMessage = true;
        if (!this.getEmail().includes('@'))
            errorMessage = 'This field must contain @';
        if (this.isEmptyInputData(this.getEmail()))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    validationPassword() {
        let minlength = 8;
        let errorMessage = true;
        const regexPassword = new RegExp('^[0-9]*$');
        if (this.getPassword().length < minlength && this.getPassword() !== 0)
            errorMessage = `Must be at least ${minlength} characters`;
        if (!regexPassword.test(this.getPassword()))
            errorMessage = 'Password can contain only numbers';
        if (this.isEmptyInputData(this.getPassword()))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    validationConfirmPassword() {
        let errorMessage = true;
        if (this.getPassword() !== this.getConfirmPassword())
            errorMessage = 'Password does not match. Please try again!';
        if (this.isEmptyInputData(this.getConfirmPassword()))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    isAllDataValid() {
        console.log(`email :${this.validationEmail()}`);
        console.log(`password :${this.validationPassword()}`);
        console.log(`confirm password:${this.validationConfirmPassword()}`);
        // todo: add or for this if statements
        if (this.validationEmail() !== true) return false;
        if (this.validationPassword() !== true) return false;
        if (this.validationConfirmPassword() !== true) return false;
        return true;
    }
}
