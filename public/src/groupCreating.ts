import { addGroup } from './services/groupService';

const groupButton = document.getElementById("createGroup"); 
const groupAddField = document.getElementById("groupName") as HTMLInputElement;

let modal : HTMLElement = document.getElementById("createGroupModal") as HTMLElement;
const currUser = sessionStorage.getItem("userObject");

const errorMessage = document.getElementById("errorMessage") as HTMLElement;

groupButton?.addEventListener('click', () => {
    const groupName = groupAddField?.value;

    errorMessage.innerText = "";

    if (groupName.length > 1) {
        addGroup(currUser, groupName);  

        modal = document.getElementById("createGroupModal") as HTMLElement;
        modal.style.display = "none";

    } else {
        errorMessage.innerText += "Invalid information. Length must be > 1";
    }
})

export{};