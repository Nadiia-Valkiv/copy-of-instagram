export default class AuthService {
    async addUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');

        const result = await fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user),
        });
        return result.json();
    }

    async getAllUsers() {
        const resp = await fetch('http://localhost:5000/auth/users', {
            method: 'GET',
        });
        return resp.json();
    }

    async getUser(username) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        const resp = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username: username,
            }),
        });
        return resp.json();
    }
}
