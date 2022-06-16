import { addGroup } from './services/groupService';

const groupList = document.getElementById("createGroup"); 
const groupAddField = document.getElementById("groupName") as HTMLInputElement;

groupList?.addEventListener('click', () => {
    const groupName = groupAddField?.value;
    console.log(groupName);
    if (groupName) {
        addGroup('frouster', groupName);
    }
})

export{};