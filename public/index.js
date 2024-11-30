
const socket = io();

const chatOutput = document.querySelector(".chatOutput");
const chatInput = document.querySelector(".chatInput");
const chatBtn = document.querySelector(".chatButton");
const joinRoomBtn = document.querySelector(".joinRoomButton");
const joinRoomInput = document.querySelector(".joinRoomInput");
const roomHeader = document.querySelector(".roomHeader");
const roomId = document.querySelector("#roomId");
joinRoomBtn.addEventListener("click", () => {
    socket.emit("join_room", joinRoomInput.value);
    roomId.textContent = joinRoomInput.value;
    roomHeader.style.display = "initial";
    socket.on("load_history", (data) => {
        console.log("Data: ", data);
        chatOutput.innerText = "";
        data.forEach((el) => {
            const messagePar = document.createElement("p");
            messagePar.textContent = socket.id === el.id ? `[You]: ${data.message}` : `${el.id}: ${el.message}`;
            chatOutput.appendChild(messagePar);
        })

    })
});

const handleSendMessage = () => {
    const message = chatInput.value;
    const room = joinRoomInput.value;
    if (message && room) {
        socket.emit("send_message", {id: socket.id, room, message});
        chatInput.value = "";

        const chatMessage = document.createElement("p");
        chatMessage.textContent = `[You]: ${message}`;
        chatMessage.style.backgroundColor = "#8fadc3"
        chatOutput.appendChild(chatMessage);
        console.log("Message sent");
    }
}

chatBtn.addEventListener("click", () => {
    handleSendMessage();
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSendMessage();
    }
});

socket.on("receive_message", (data) => {
    const chatMessage = document.createElement("p");
    chatMessage.textContent = `${data.id}: ${data.message}`;
    chatOutput.appendChild(chatMessage);
    console.log("Message received");
});
