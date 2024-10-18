import "dotenv/config";
import {promises as fsp} from 'fs';


const {FILENAME} = process.env;

console.log("File name: ", FILENAME);

async function createFile() {
    try {
        await fsp.writeFile(FILENAME, "Node.js is awesome!");
        console.log(`Файл ${FILENAME} успешно создан`);
    } catch (err) {
        console.error("Ошибка при создании файла 'info.txt': ", err);
    }
}

async function readFile() {
    try {
        const data = await fsp.readFile(FILENAME, "utf-8");
        console.log(data);
    } catch (err) {
        console.error(`Ошибка при чтении файла ${FILENAME}: `, err);
    }
}

//TODO: По какой-то причине readFile вызывался раньше createFile (Хотя файл создавался без проблем), поэтому так
// createFile().then(r => {
//     readFile();
// });

async function main() {
    await createFile();
    await readFile();
}

main();

