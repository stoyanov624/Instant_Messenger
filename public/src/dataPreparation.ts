import { generateGroup } from "./services/groupService";

const user = JSON.parse(sessionStorage.getItem('userObject') as string);
const groupList = document.getElementById("groupList") as HTMLElement; 

function setUsernameForProfile() {
    const usernameField = document.getElementById('profileUsername') as HTMLElement;
    usernameField.innerText = user.username;
}

function generateUserGroups() {
    const userGroups = user.chatgroups;
    for (const group of userGroups) {
        const newButton = document.createElement("button");
        const chatLink = document.createElement("a");
        
        newButton.textContent = group.content;
        newButton.id = group.id;
        newButton.className = "group-display";

        newButton.addEventListener('click', (event) => {
            const button = event.target as HTMLButtonElement;
            const groupId = Number(button.id);
            const groupName = `${button.textContent} (ID: ${groupId})`;
            generateGroup(groupId, groupName);
        })

        chatLink.appendChild(newButton);
        groupList.appendChild(newButton);
    }
}

setUsernameForProfile();
generateUserGroups();

export {};