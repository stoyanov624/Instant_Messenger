function addGroups(){
    const groupListKey = 'groupList';
    // window.localStorage.setItem(groupListKey, ['dsaasd', 'dasdsadas']);
    let groupList = document.getElementById(groupListKey);
    const groups = window.localStorage.getItem(groupListKey);  
    for (let i of groups){
        const newButtom = document.createElement("button");
        const chatLink = document.createElement("a");

        newButtom.textContent = i;
        newButtom.className = "profileButton";
        newButtom.style.width = "80px";
        newButtom.style.margin = "30px 30px 0px 0px ";
        newButtom.style.color="none";
        chatLink.appendChild(newButtom);
        groupList.appendChild(newButtom);   
    }
}

function addFriends(){
    const friendListKey = 'friendList';
    // window.localStorage.setItem(friendListKey, ['dsaasd', 'dasdsadas']);
    let friendList = document.getElementById(friendListKey);
    const friends = window.localStorage.getItem(friendListKey);  
    for (let i of friends){
        const newButtom = document.createElement("button");
        newButtom.textContent = i;
        newButtom.className = "profileButton";
        newButtom.style.width = "80px";
        newButtom.style.margin = "30px 30px 0px 0px ";
        newButtom.style.color="none";
        friendList.appendChild(newButtom);   
    }
}