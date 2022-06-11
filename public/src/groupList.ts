const groups = ["Ivan", "Pesho", "Georgi", "Lelq vi"]; //remove me later
const friends = ["Iva", "Mel", "Anji", "Lelq vi Pena"]; //remove me later
const groupList = document.getElementById("groupList") as HTMLElement; 
const friendList = document.getElementById("friendList") as HTMLElement;

function addGroups() {    
    for (let group of groups){
        const newButton = document.createElement("button");
        const chatLink = document.createElement("a");

        newButton.textContent = group;
        newButton.className = "profileButton";
        newButton.style.width = "80px";
        newButton.style.margin = "30px 30px 0px 0px ";
        newButton.style.color="none";
        chatLink.appendChild(newButton);
        groupList.appendChild(newButton);   
    }
}

function addFriends() {
    for (let friend of friends){
        const newButton = document.createElement("button");
        newButton.textContent = friend;
        newButton.className = "profileButton";
        newButton.style.width = "80px";
        newButton.style.margin = "30px 30px 0px 0px ";
        newButton.style.color="none";
        friendList.appendChild(newButton);   
    }
}

if(groupList && friendList) {
    groupList.onclick = () => {
        addGroups();
    }
    friendList.onclick = () => {
        addFriends();
    }
}

export {}