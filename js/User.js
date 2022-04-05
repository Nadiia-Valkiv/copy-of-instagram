// this class is useless now
export default class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.name = undefined;
        this.surName = undefined;
        this.gender = undefined;
        this.hobby = [];
        this.country = undefined;
        this.dateOfBirth = undefined;
        this.isLogin = false;
    }

    updateExistingUser(email) {
        
    }
}
