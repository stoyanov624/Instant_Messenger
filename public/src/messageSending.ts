const input = document.getElementById('msg-sender') as HTMLInputElement | null;
const messages = document.getElementById('chat');

if(messages) {
    messages.scrollTop = messages.scrollHeight;
}

if(input) {
    input.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            let msg = input.value;
            if(!msg || msg === '') {
                return;
            } else {
                sendMessage(msg);
            }
        }
    });
}

const sendMessage = (msg : string) => {
    createMessage(msg);
    console.log(`msg ${msg} send`);
}

const createMessage = (msg: string) => {
    const myHTMLMessage = document.createElement('li');
    myHTMLMessage.classList.add(...['message', 'my-message', 'shadow']);
    const shouldKeepScrollAtBottom = (messages?.scrollHeight || 0) - (messages?.scrollTop || 0) === messages?.clientHeight;

    const userTag = document.createElement('div');
    userTag.classList.add('my-user-tag');

    const senderName = document.createElement('p');
    senderName.classList.add('sender-name');
    senderName.innerText = 'You';

    const senderIcon = document.createElement('img');
    senderIcon.classList.add('user-chat-icon');
    senderIcon.src = 'UI/Materials/user-profile-account-digital-data-robot-multimedia.png';

    const myMessage = document.createElement('div');
    myMessage.classList.add('message-text');
    myMessage.innerText = msg;

    userTag.appendChild(senderIcon);
    userTag.appendChild(senderName);
    myHTMLMessage.appendChild(userTag);
    myHTMLMessage.appendChild(myMessage);
    messages?.appendChild(myHTMLMessage);
    
    if(shouldKeepScrollAtBottom) {
        messages.scrollTop = messages.scrollHeight;
    }
}

export {};