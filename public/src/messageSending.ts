const input = document.getElementById('msg-sender') as HTMLInputElement | null;
const messages = document.getElementById('chat');

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

const sendMyMessage = (message : string) => {
    createMyMessageElement(message);
    console.log(`msg ${message} send`);
}

const createMyMessageElement = (message: string) => {
    const myHTMLMessage = document.createElement('li');
    myHTMLMessage.classList.add(...['message', 'my-message', 'shadow']);
    const shouldKeepScrollAtBottom = (messages?.scrollHeight || 0) - (messages?.scrollTop || 0) === messages?.clientHeight;
    
    const userTag = createUserTagElement('You');
    const myMessage = createMessageElement(message);
    
    myHTMLMessage.appendChild(userTag);
    myHTMLMessage.appendChild(myMessage);
    messages?.appendChild(myHTMLMessage);
    
    if (shouldKeepScrollAtBottom) {
        messages.scrollTop = messages.scrollHeight;
    }
}

const createUserTagElement = (username: string) => {
    const userTagElement = document.createElement('div');
    userTagElement.classList.add('my-user-tag');

    const senderName = createSenderNameElement(username);
    const senderIcon = createSenderIconElement();

    userTagElement.appendChild(senderIcon);
    userTagElement.appendChild(senderName);

    return userTagElement;
}


const createSenderNameElement = (username: string) => {
    const senderNameElement = document.createElement('p');
    senderNameElement.classList.add('sender-name');
    senderNameElement.innerText = username;

    return senderNameElement;
}

const createSenderIconElement = () => {
    const senderIcon = document.createElement('img');
    senderIcon.classList.add('user-chat-icon');
    senderIcon.src = 'UI/Materials/user-profile-account-digital-data-robot-multimedia.png';

    return senderIcon;
}

const createMessageElement = (messageSend: string) => {
    const message = document.createElement('div');
    message.classList.add('message-text');
    message.innerText = messageSend;

    return message;
}

export {};