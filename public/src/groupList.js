const groups = ["Ivan", "Pesho", "Georgi", "Lelq vi"]; //remove me later
const friends = ["Iva", "Mel", "Anji", "Lelq vi Pena"]; //remove me later

function addGroups(){
    debugger;
    let groupList = document.getElementById("groupList");    
    for (let i of groups){
        const newButtom = document.createElement("button");
        const chatLink = document.createElement("a");
        // chatComponent.href = "";

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
    debugger;
    let friendList = document.getElementById("friendList");    
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