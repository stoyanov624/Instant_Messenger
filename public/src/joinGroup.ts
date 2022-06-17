import { joinGroup } from './services/groupService';


const joinGroupButton = document.getElementById("joinGroup"); 
const groupIdField = document.getElementById("groupId") as HTMLInputElement;
const joinGroupError = document.getElementById("errorMessage") as HTMLElement;

let modal : HTMLElement = document.getElementById("joinGroupModal") as HTMLElement;
const currUser = localStorage.getItem("userObject");

joinGroupButton?.addEventListener('click', () => {
    const groupId = Number(groupIdField?.value);
    console.log(groupId);
    try {
        if(!groupId || groupId < 1) {
            if (joinGroupError.innerText.length < 1) {
                joinGroupError.innerText += "Invalid group ID. Make sure is positive!";
            }
        } 
    } catch (error) {
        joinGroupError.innerText += error;
    }

    
})

export{}