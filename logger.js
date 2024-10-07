const fs = require("fs");

const logMessage = (message) => {
    const date = new Date();
    const formattedDateTime = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    fs.appendFile("log.txt", `[${formattedDateTime}] | ${message} \n`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Файл изменен");
    })
}

module.exports = logMessage;