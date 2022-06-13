import { login } from "./services/userService";

const registerNavigationButton = document.getElementById('reg-nav-btn');
const loginButton = document.getElementById('login-btn');
const backButton = document.getElementById('back-nav-btn');
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

const usernameField = document.getElementById('username-field') as HTMLInputElement;

loginButton?.addEventListener('click', () => {
    login('alabala', 'alabala');
}); 

backButton?.addEventListener('click', () => {
    if (registerForm && loginForm) {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block'
    }
})

registerNavigationButton?.addEventListener('click', () => {
    if (registerForm && loginForm) {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none'
    }
})

export {};