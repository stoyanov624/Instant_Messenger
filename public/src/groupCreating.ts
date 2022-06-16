import { addGroup } from './services/groupService';

const groupButton = document.getElementById("createGroup"); 
const groupAddField = document.getElementById("groupName") as HTMLInputElement;

const groupInformationReq = document.getElementById("groupInfo") as HTMLElement; 
const groupList = document.getElementById("groupList") as HTMLElement; 
let modal : HTMLElement = document.getElementById("createGroupModal") as HTMLElement;

groupButton?.addEventListener('click', () => {
    const groupName = groupAddField?.value;

    if (groupName.length > 1) {
        addGroup('frouster', groupName);

        document.getElementById("errorMessage")?.remove();

        const newButton = document.createElement("button");
        const chatLink = document.createElement("a");

        newButton.textContent = groupName;
        newButton.className = "profileButton";
        newButton.style.width = "80px";
        newButton.style.margin = "30px 30px 0px 0px ";
        newButton.style.marginLeft = "10px";
        newButton.style.height = "60px";
        newButton.style.color="none";
        chatLink.appendChild(newButton);
        groupList.appendChild(newButton);  


        modal = document.getElementById("createGroupModal") as HTMLElement;
        modal.style.display = "none";
        console.log("blocked")

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