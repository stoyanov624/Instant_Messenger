const input = document.getElementById("msg-sender") as HTMLInputElement | null;
if(input) {
    input.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            let msg = input.value;
            if(!msg || msg === '') {
                return;
            } else {
                console.log(msg);
            }
        }
    });
}

export {};