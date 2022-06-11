const startButton = document.getElementById('start');
const registerButton = document.getElementById('reg-btn');
const backButton = document.getElementById('back-btn');
const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');

const usernameField = document.getElementById('username-field') as HTMLInputElement;
startButton?.addEventListener('click', () => {
    if(usernameField?.value.trim()) {
        window.localStorage.setItem('username', usernameField.value);
        window.location.replace('http://localhost:8080/home.html')
    }
}); 

backButton?.addEventListener('click', () => {
    if (registerForm && loginForm) {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block'
    }
})

registerButton?.addEventListener('click', () => {
    if (registerForm && loginForm) {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none'
    }
})

export {};