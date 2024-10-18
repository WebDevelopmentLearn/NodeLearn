import { promises as fsp } from "fs";


async function writeToLogFile(dataFromFile) {
    try {
        await fsp.appendFile("log.txt", dataFromFile, "utf-8");
    } catch (err) {
        console.error('Ошибка при записи в файл:', err);
    }
}

export const logMessage = async (message) => {
    const date = new Date();
    const formattedDateTime = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    try {
        await writeToLogFile(`[${formattedDateTime}] | ${message} \n`);
        console.log("Файл изменен");
    } catch (err) {
        console.error('Ошибка при записи сообщения:', err);
    }
};


