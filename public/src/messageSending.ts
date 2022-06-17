import {io} from 'socket.io-client';
import { createMyMessageElement, createReceivedMessageElement } from './services/messageService';

const user = JSON.parse(sessionStorage.getItem('userObject') as string);
console.log(user);
const socket = io('http://localhost:3000');
const input = document.getElementById('msg-sender') as HTMLInputElement | null;
const messages = document.getElementById('chat') as HTMLElement;

socket.emit('join-rooms', user.chatgroups);

if (input) {
    input.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            const message = input.value;
            if(!message || message === '') {
                return;
            } else {
                sendMyMessage(message);
                input.value = '';
            }
        }
    });
}

socket.on('receive-message', (message : string) => {
    createReceivedMessageElement(message, messages)
})

const sendMyMessage = (message : string) => {
    createMyMessageElement(message, messages);
    console.log(socket.id);
    socket.emit('send-message', message, 1);
}

export {};