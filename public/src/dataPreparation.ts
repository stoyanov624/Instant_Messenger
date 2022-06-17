import { generateGroup } from "./services/groupService";

const user = JSON.parse(localStorage.getItem('userObject') as string);
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
        newButton.addEventListener('click', async (event) => {
            const groupId = Number((event.target as HTMLButtonElement).id);
            generateGroup(groupId);
        })
        chatLink.appendChild(newButton);
        groupList.appendChild(newButton);
    }
}

setUsernameForProfile();
generateUserGroups();

export {};