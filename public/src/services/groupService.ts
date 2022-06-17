import axios from 'axios';
const joinGroupError = document.getElementById("errorMessage") as HTMLElement;

const addGroup = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        console.log(response.data);
    })
}

const joinGroup = (username: any, groupId : string) => {
    axios.post('http://localhost:3000/groups/join', {
        username: username,
        groupId: groupId,
    }).then(response => {
        if(response.status == 200) {
            console.log(response.data);
        }
    }, error => {
        console.log(error.response.data.messageErr);
        joinGroupError.innerText = "";
        joinGroupError.innerText += error.response.data.messageErr;
    });
}


export {addGroup, joinGroup}; 