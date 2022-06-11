const addFriendButton = document.getElementById("addFriendButton");
const createGroupButton = document.getElementById("createGroupButton");
const closeButtons = document.getElementsByClassName("close") as HTMLCollectionOf<HTMLElement>; 
let modal : HTMLElement = document.getElementById("addFriendModal") as HTMLElement;

if(addFriendButton && createGroupButton ) {
    addFriendButton.onclick = function() {
        modal = document.getElementById("addFriendModal") as HTMLElement;
        modal.style.display = "block";
    }

    createGroupButton.onclick = function() {
        modal = document.getElementById("createGroupModal") as HTMLElement;
        modal.style.display = "block";
    }
}

for (const button of closeButtons) {
    button.onclick = function() {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

export {}