import { joinGroup } from './services/groupService';


const joinGroupButton = document.getElementById("joinGroup"); 
const groupIdField = document.getElementById("groupId") as HTMLInputElement;
const joinGroupError = document.getElementById("errorMessage") as HTMLElement;

let modal : HTMLElement = document.getElementById("joinGroupModal") as HTMLElement;
const currUser = localStorage.getItem("userObject");

joinGroupButton?.addEventListener('click', () => {
    const username = localStorage.getItem("username");
    const groupId = groupIdField?.value;

    //Removing the errors
    joinGroupError.innerText = "";
    
        if(!groupId || Number(groupId) < 1) {
            if (joinGroupError.innerText.length < 1) {
                joinGroupError.innerText += "Invalid group ID. Make sure is positive!";
            }
        } 
        try {
        joinGroup(username, groupId);
    } catch (error) {
        console.log(error);
        joinGroupError.innerText += error;
    }

    
})

export{}