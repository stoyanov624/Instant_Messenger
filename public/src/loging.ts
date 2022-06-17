import { login, register } from './services/userService';

const registerNavigationButton = document.getElementById('reg-nav-btn');
const backButton = document.getElementById('back-nav-btn');

const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

const usernameLoginField = document.getElementById('username-login-field') as HTMLInputElement;
const passwordLoginField = document.getElementById('password-login-field') as HTMLInputElement;

const usernameRegisterField = document.getElementById('username-register-field') as HTMLInputElement;
const passwordRegisterField = document.getElementById('password-register-field') as HTMLInputElement;
const emailRegisterField = document.getElementById('email-register-field') as HTMLInputElement;

loginButton?.addEventListener('click', () => {
    const username = usernameLoginField?.value;
    const password = passwordLoginField?.value;

    if (username && password) {
        login(username, password);
    }
}); 

registerButton?.addEventListener('click', () => {
    const username = usernameRegisterField?.value;
    const password = passwordRegisterField?.value;
    const email = emailRegisterField?.value;

    if (username && password && email) {
        register(username, password, email);
    }
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