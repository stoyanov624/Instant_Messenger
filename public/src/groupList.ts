const groups : string[] = [];
const friends : string[] = []; 
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

export {}