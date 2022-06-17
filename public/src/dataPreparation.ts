const user = JSON.parse(localStorage.getItem('userObject') as string);
const groupList = document.getElementById("groupList") as HTMLElement; 

function setUsernameForProfile() {
    const usernameField = document.getElementById('profileUsername') as HTMLElement;
    usernameField.innerText = user.username;
}

function generateUserGroups() {
    console.log(user);
    const userGroups = user.chatgroups;
    console.log(userGroups);
    for (const group of userGroups) {
        const newButton = document.createElement("button");
        const chatLink = document.createElement("a");
        newButton.textContent = group.content;
        newButton.className = "group-display";
        chatLink.appendChild(newButton);
        groupList.appendChild(newButton);
    }
}

setUsernameForProfile();
generateUserGroups();
export {};