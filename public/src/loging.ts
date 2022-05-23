const startButton = document.getElementById('start');
const usernameField = document.getElementById('username-field') as HTMLInputElement;
startButton?.addEventListener('click', () => {
    if(usernameField?.value.trim()) {
        window.localStorage.setItem('username', usernameField.value);
        window.location.replace('http://localhost:8080/home.html')
    }
}); 

export {};