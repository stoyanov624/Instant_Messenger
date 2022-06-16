import { addGroup } from './services/groupService';

const groupButton = document.getElementById("createGroup"); 
const groupAddField = document.getElementById("groupName") as HTMLInputElement;

const groupInformationReq = document.getElementById("groupInfo") as HTMLElement; 

groupButton?.addEventListener('click', () => {
    const groupName = groupAddField?.value;
    
    if (groupName.length > 1) {
        addGroup('frouster', groupName);

        document.getElementById("errorMessage")?.remove();
    } else {

        if (!document.getElementById("errorMessage")) {
            const newSpanMessage = document.createElement("span");
            newSpanMessage.setAttribute("id", "errorMessage");
            newSpanMessage.textContent = "Invalid information. Length must be > 1";
            newSpanMessage.style.color = "red";

            groupInformationReq.appendChild(newSpanMessage);
        }
    }
})

export{};