import http from "http";
import "dotenv/config";

//TODO: Задание 3 Обработка PUT и DELETE запросов
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    if (req.method === "PUT") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message:  "PUT-запрос обработан" }));
    } else if (req.method === "DELETE") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message:  "DELETE-запрос обработан" }));
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "GET-запрос обработан" }));
    }

    /*
    fetch("http://localhost:3300/", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({message: "test"})
                })
                    .then(res => res.text())
                    .then(result => console.log(result))
                    .catch((error) => console.error(error));
     */

});


server.listen(SERVER_PORT, "localhost", () => {
    console.log(`Server running at: http://localhost:${SERVER_PORT}`);
})