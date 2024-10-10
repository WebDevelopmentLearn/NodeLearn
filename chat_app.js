import {EventEmitter} from "events";

const chatEmitter = new EventEmitter();

const sendMessage = (username, message, eventObj) => {
    eventObj.emit("onMessage", username, message);
}

chatEmitter.on("onMessage", (username, message) => {
    console.log(`${username}: ${message}`);
});


sendMessage("Obi-Wan Kenobi", "Hello There", chatEmitter);
sendMessage("Grievous", "General Kenobi", chatEmitter);

