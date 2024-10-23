import http from "http";
import "dotenv/config";

//TODO: Задание 1 Работа с заголовком Authorization
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    res.setHeader("Content-Type", "text/plain");

    if (authHeader) {
        res.statusCode = 200;
        console.log("Authorization header is present");
        res.end("Authorization header received");
    } else {
        res.statusCode = 401;
        console.log("Authorization header is not present");
        res.end("Unauthorized");
    }
});


server.listen(SERVER_PORT, "localhost", () => {
    console.log(`Server running at: http://localhost:${SERVER_PORT}`);
})