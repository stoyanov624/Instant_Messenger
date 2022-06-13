import axios from 'axios';

const login = (username: string, password: string) => {
    axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
    }).then(response => {
        console.log(response.data);
    })
}

export {login}; 