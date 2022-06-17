import axios from 'axios';
const joinGroupError = document.getElementById("errorMessage") as HTMLElement;

const addGroup = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        const group = response.data;
        const parseUser = JSON.parse(userObject);
        parseUser.chatgroups.push(group);
        localStorage.setItem("userObject", JSON.stringify(parseUser));
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

const saveMessage = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        console.log(response.data);
    })
}

const fetchMessages = (groupId: number) => {
    return axios.get(`http://localhost:3000/groups/messages/${groupId}`);
}

const generateGroup = (groupId: number) => {
    fetchMessages(groupId).then(response => (
        console.log(response.data)
    ));
}

export {addGroup, joinGroup, generateGroup}; 
