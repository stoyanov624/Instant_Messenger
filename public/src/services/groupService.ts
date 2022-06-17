import axios from 'axios';
import { createMyMessageElement, createReceivedMessageElement } from './messageService';
const joinGroupError = document.getElementById("errorMessageJoin") as HTMLElement;

const addGroup = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        const group = response.data;
        const parseUser = JSON.parse(userObject);
        parseUser.chatgroups.push(group);
        localStorage.setItem("userObject", JSON.stringify(parseUser));
        generateGroupButton(group.content, group.id);
    })
}

const joinGroup = (username: any, groupId : Number ) => {
    axios.post('http://localhost:3000/groups/join', {
        username: username,
        groupId: groupId,
    }).then(response => {
        const group = response.data;
        const userObject = JSON.parse(sessionStorage.getItem('userObject') as string);
        userObject.chatgroups.push(group);
        localStorage.setItem("userObject", JSON.stringify(userObject));
        generateGroupButton(group.content, group.id);

        const modal = document.getElementById("joinGroupModal") as HTMLElement;
        modal.style.display = "none";
    }, error => {
        joinGroupError.innerText = "";
        joinGroupError.innerText += error.response.data.messageErr;
    });
}

const saveMessage = (message : string, userId : number, chatGroupId: number) => {
    axios.post('http://localhost:3000/groups/messages', {
        message: {
            content: message,
            userId: userId,
            chatGroupId: chatGroupId
        }
    });
}

const fetchMessages = (groupId: number) => {
    return axios.get(`http://localhost:3000/groups/messages/${groupId}`);
}

const generateGroup = (groupId: number, groupName: string) => {
    fetchMessages(groupId).then(response => {
        const chat = document.getElementById('chat') as HTMLElement;

        const userId = Number(JSON.parse(sessionStorage.getItem('userObject') as string).id);
        const messages = response.data;
        console.log(messages);
        
        const chatWindow = document.getElementById('chat-window') as HTMLElement;
        const messageContainer = chatWindow.querySelector('#chat') as HTMLElement;
        messageContainer.innerHTML = "";

        chatWindow.style.display = "flex";
        chatWindow.style.flexDirection = "column";

        const chatNameHtml = chatWindow.querySelector('#chat-name') as HTMLElement;
        chatNameHtml.innerText = `Public chat: ${groupName}`;

        for (const message of messages) {
            if (message.userId == userId) {
                createMyMessageElement(message.content, chat);
            } else {
                createReceivedMessageElement(message.content, message.user.username ,chat);
            }
        }

        sessionStorage.setItem('openedChat', groupId.toString());
    })
}

const generateGroupButton = (groupName: string, groupId: number) => {
    const groupList = document.getElementById("groupList") as HTMLElement; 
    
    const newButton = document.createElement("button") as HTMLElement;
    const chatLink = document.createElement("a");
    newButton.textContent = groupName;
    newButton.id = groupId.toString();
    newButton.className = "group-display";
    chatLink.appendChild(newButton);
    groupList.appendChild(newButton);  

    newButton.addEventListener('click', (event) => {
        const groupId = Number((event.target as HTMLButtonElement).id);
        const groupName = (event.target as HTMLButtonElement).textContent as string;
        generateGroup(groupId, groupName);
    })
}

export {addGroup, joinGroup, generateGroup, saveMessage}; 
