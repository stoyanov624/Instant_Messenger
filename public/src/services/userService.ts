import axios from 'axios';
const authErrors = document.getElementById("errorMessage") as HTMLElement;
const login = (username: string, password: string) => {
    axios.post('http://localhost:3000/users/login', {
        username: username,
        password: password
    }).then(response => {
        window.localStorage.setItem("userObject", JSON.stringify(response.data));
        window.localStorage.setItem("username", username);
        window.location.replace("http://localhost:8080/home.html");
    }, error => {
        console.log(error.response.data.messageErr);
        authErrors.innerText = "";
        authErrors.innerText += error.response.data.messageErr;
    })
}

const register = (username: string, password: string, email: string) => {
    axios.post('http://localhost:3000/users/register', {
        username: username,
        password: password,
        email: email
    }).then(response => {
        window.localStorage.setItem("userObject", JSON.stringify(response.data));
        window.localStorage.setItem("username", username);
        window.location.replace("http://localhost:8080/home.html");
    }, error => {
        console.log(error.response.data.messageErr);
        authErrors.innerText = "";
        authErrors.innerText += error.response.data.messageErr;
    })
}
export {login, register}; 