import {promises as fsp} from 'fs';

async function createFile() {
    try {
        await fsp.writeFile("info.txt", "Node.js is awesome!");
        console.log("Файл 'info.txt' успешно создан");
    } catch (err) {
        console.error("Ошибка при создании файла 'info.txt': ", err);
    }
}

async function readFile() {
    try {
        const data = await fsp.readFile("info.txt", "utf-8");
        console.log(data);
    } catch (err) {
        console.error("Ошибка при чтении файла 'info.txt': ", err);
    }
}


createFile();
readFile();