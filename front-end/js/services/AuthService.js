export default class AuthService {
    registerUser(user) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        
        fetch('http://localhost:5000/auth/registration', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user),
        }).then( res => res.json() ).then(res => {
            console.log('result of response: ', res.message);
        });
    }
}
