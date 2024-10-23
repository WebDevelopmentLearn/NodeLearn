import http from "http";
import {promises as fsp} from "fs";
import "dotenv/config";

//TODO: Задание 2 Логирование ошибок сервера
const SERVER_PORT = process.env.SERVER_PORT || 3000;

async function writeLog(data) {
    try {
        await fsp.appendFile("errors.log", `[${new Date().toISOString()}] ${data}\n`);
    } catch (error) {
        console.error(error);
    }
}


const server = http.createServer(async (req, res) => {
    try {
        throw new Error("Тестовая ошибка");
    } catch (error) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        await writeLog(error.message);
    }
});


server.listen(SERVER_PORT, "localhost", () => {
    console.log(`Server running at: http://localhost:${SERVER_PORT}`);
})