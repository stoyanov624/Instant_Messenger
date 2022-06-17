import axios from 'axios';

const addGroup = (userObject: any, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        userObject: userObject,
        groupName: groupName,
    }).then(response => {
        console.log(response.data);
    })
}

const joinGroup = (userObject: any, groupId : string) => {
    axios.post('http://localhost:3000/users/joinGroup', {
        userObject: userObject,
        groupId: groupId,
    }).then(response => {
        console.log(response.data);
    })
}

export {addGroup, joinGroup}; 