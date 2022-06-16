import axios from 'axios';

const login = (username: string, password: string) => {
    axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
    }).then(response => {
        window.localStorage.setItem("userObject", JSON.stringify(response.data));
        window.location.replace("http://localhost:8080/home.html");
    })
}

const register = (username: string, password: string, email: string) => {
    axios.post('http://localhost:3000/users/register', {
        username: username,
        password: password,
        email: email
    }).then(response => {
        window.localStorage.setItem("userObject", JSON.stringify(response.data));
        window.location.replace("http://localhost:8080/home.html");
    })
}
export {login, register}; 