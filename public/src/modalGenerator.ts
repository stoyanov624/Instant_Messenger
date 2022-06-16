const addFriendButton = document.getElementById("addFriendButton");
const createGroupButton = document.getElementById("createGroupButton");
const joinGroupButton = document.getElementById("joinGroupButton");
const closeButtons = document.getElementsByClassName("close") as HTMLCollectionOf<HTMLElement>; 
let modal : HTMLElement = document.getElementById("addFriendModal") as HTMLElement;

if(addFriendButton && createGroupButton && joinGroupButton) {
    addFriendButton.onclick = function() {
        modal = document.getElementById("addFriendModal") as HTMLElement;
        modal.style.display = "block";
    }

    createGroupButton.onclick = function() {
        modal = document.getElementById("createGroupModal") as HTMLElement;
        modal.style.display = "block";
    }

    joinGroupButton.onclick = function() {
        modal = document.getElementById("joinGroupModal") as HTMLElement;
        modal.style.display = "block";
    }
}

for (const button of closeButtons) {
    button.onclick = function() {
        modal.style.display = "none";
        document.getElementById("errorMessage")?.remove();
    }
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

export {}