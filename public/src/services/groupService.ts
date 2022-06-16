import axios from 'axios';

const addGroup = (username: string, groupName : string) => {
    axios.post('http://localhost:3000/users/addGroup', {
        username: username,
        groupName: groupName,
    }).then(response => {
        console.log(response.data);
    })
}
export {addGroup}; 