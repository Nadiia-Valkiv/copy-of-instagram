import Form from './Form.js';

export default class SignUp extends Form {
    constructor(email, password, confirmPassword) {
        super(email, password);
        this.confirmPassword = confirmPassword;
    }

    createNewUser() {
        if (this.isAllDataValid) {
            return {
                [this.email]: {
                    password: this.password,
                    isLogin: false
                }
            }
        } else {
            console.log('Can not create ew user. Provided data is invalid');
        }
    }

    validationEmail() {
        let errorMessage = true;
        if (!this.email.includes('@'))
            errorMessage = 'This field must contain @';
        if (this.isEmptyInputData(this.email))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    validationPassword() {
        let minlength = 8;
        let errorMessage = true;
        const regexPassword = new RegExp('^[0-9]*$');
        if (this.password.length < minlength && this.password !== 0)
            errorMessage = `Must be at least ${minlength} characters`;
        if (!regexPassword.test(this.password))
            errorMessage = 'Password can contain only numbers';
        if (this.isEmptyInputData(this.password))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    validationConfirmPassword() {
        let errorMessage = true;
        if (this.password !== this.confirmPassword)
            errorMessage = 'Password does not match. Please try again!';
        if (this.isEmptyInputData(this.confirmPassword))
            errorMessage = 'This field is required';
        return errorMessage;
    }

    isAllDataValid() {
        console.log(`email :${this.validationEmail()}`);
        console.log(`password :${this.validationPassword()}`);
        console.log(`confirm password:${this.validationConfirmPassword()}`);
        if (this.validationEmail() !== true) return false;
        if (this.validationPassword() !== true) return false;
        if (this.validationConfirmPassword() !== true) return false;
        return true;
    }
}
