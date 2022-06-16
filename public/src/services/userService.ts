import axios from 'axios';

const login = (username: string, password: string) => {
    axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
    }).then(response => {
        console.log(response.data);
    })
}

const register = (username: string, password: string, email: string) => {
    axios.post('http://localhost:3000/users/register', {
        username: username,
        password: password,
        email: email
    }).then(response => {
        console.log(response.data);
    })
}
export {login, register}; 