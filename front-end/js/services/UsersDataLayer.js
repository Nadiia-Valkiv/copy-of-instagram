export default class UsersDataLayer {
    async add(user) {
        const result = await fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        return result.json();
    }

    async get(username) {
        const resp = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
            }),
        });
        return resp.json();
    }

    async getAll() {
        const resp = await fetch('http://localhost:5000/auth/users', {
            method: 'GET',
        });
        return resp.json();
    }

    async delete(username) {
        const resp = await fetch('http://localhost:5000/auth/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
            }),
        });
        return resp.json();
    }

    update(user) {
        
    }

    getAllForToken(tableName) {
        return JSON.parse(localStorage.getItem(tableName)) || {};
    }
}
