import axios from 'axios';
import { createMyMessageElement, createReceivedMessageElement } from './messageService';
const joinGroupError = document.getElementById("errorMessage") as HTMLElement;

const addGroup = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        const group = response.data;
        const parseUser = JSON.parse(userObject);
        parseUser.chatgroups.push(group);
        localStorage.setItem("userObject", JSON.stringify(parseUser));
        generateGroupButton(group.content);
    })
}

const joinGroup = (username: any, groupId : string) => {
    axios.post('http://localhost:3000/groups/join', {
        username: username,
        groupId: groupId,
    }).then(response => {
        const group = response.data;
        const userObject = JSON.parse(sessionStorage.getItem('userObject') as string);
        userObject.chatgroups.push(group);
        localStorage.setItem("userObject", JSON.stringify(userObject));
        generateGroupButton(group.content);
    }, error => {
        console.log(error.response.data.messageErr);
        joinGroupError.innerText = "";
        joinGroupError.innerText += error.response.data.messageErr;
    });
}

const saveMessage = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        console.log(response.data);
    })
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
                createReceivedMessageElement(message.content, chat);
            }
        }
    })
}

const generateGroupButton = (groupName: string) => {
    const groupList = document.getElementById("groupList") as HTMLElement; 
    
    const newButton = document.createElement("button");
    const chatLink = document.createElement("a");
    newButton.textContent = groupName;
    newButton.className = "group-display";
    chatLink.appendChild(newButton);
    groupList.appendChild(newButton);  
}

export {addGroup, joinGroup, generateGroup}; 
