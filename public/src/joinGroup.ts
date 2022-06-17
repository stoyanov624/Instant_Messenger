import { joinGroup } from './services/groupService';


const joinGroupButton = document.getElementById("joinGroup"); 
const groupIdField = document.getElementById("groupId") as HTMLInputElement;

const errorMessage = document.getElementById("errorMessageJoin") as HTMLElement;
let modal : HTMLElement = document.getElementById("joinGroupModal") as HTMLElement;
joinGroupButton?.addEventListener('click', () => {
    const username = sessionStorage.getItem("username");
    const groupId = Number(groupIdField?.value);

    //Removing the errors
    errorMessage.innerText = "";
        if (isNaN(groupId) || groupId < 1) {
                errorMessage.innerText += "Invalid group ID. Make sure is positive and it is number";
        } else {
        try {
            joinGroup(username, groupId); 
         } catch (error) {
                console.log(error);
                errorMessage.innerText += error;
            }
        }
    
})

export{}