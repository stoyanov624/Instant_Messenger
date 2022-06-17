

const createReceivedMessageElement = (message: string, chat: HTMLElement) => {
    const myHTMLMessage = document.createElement('li');
    myHTMLMessage.classList.add(...['message', 'shadow']);
    const shouldKeepScrollAtBottom = (chat?.scrollHeight || 0) - (chat?.scrollTop || 0) === chat?.clientHeight;
    
    const userTag = createUserTagElement('My friend!');
    userTag.classList.remove('my-user-tag');
    const myMessage = createMessageElement(message);
    
    myHTMLMessage.appendChild(userTag);
    myHTMLMessage.appendChild(myMessage);
    chat?.appendChild(myHTMLMessage);
    
    if (shouldKeepScrollAtBottom) {
        chat.scrollTop = chat.scrollHeight;
    }
}

const createMyMessageElement = (message: string, chat: HTMLElement) => {
    const myHTMLMessage = document.createElement('li');
    myHTMLMessage.classList.add(...['message', 'my-message', 'shadow']);
    const shouldKeepScrollAtBottom = (chat?.scrollHeight || 0) - (chat?.scrollTop || 0) === chat?.clientHeight;
    
    const userTag = createUserTagElement('You');
    const myMessage = createMessageElement(message);
    
    myHTMLMessage.appendChild(userTag);
    myHTMLMessage.appendChild(myMessage);
    chat?.appendChild(myHTMLMessage);
    
    if (shouldKeepScrollAtBottom) {
        chat.scrollTop = chat.scrollHeight;
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


export {createMyMessageElement, createReceivedMessageElement}