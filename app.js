import express from 'express';
import cors from 'cors';
import {connectToDatabase} from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3400;

async function startServer() {
    try {
        await connectToDatabase();

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        //TODO: Обработка ошибок
        app.use((err, req, res, next) => {
            console.error("Error: ", err);
            res.status(500).send("Internal server error. Please see the logs for more details");
        });

        app.listen(PORT, async() => {
            try {
                console.log(`Server is running at: http://localhost:${PORT}`);
            } catch (error) {
                console.error("Error: ", error);
            }
        });
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

startServer();