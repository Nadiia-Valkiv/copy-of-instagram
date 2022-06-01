export default class User {
    constructor(email, password) {
        this.username = email;
        this.password = password;
        console.log('user created');
    }
}