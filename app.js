import express from 'express';
import "dotenv/config";
import sequelizeInstance from "./config/db.js";
import App from "./models/App.js";


const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get("/apps", async (req, res) => {
    try {
        const apps = await App.findAll();
        res.json(apps);
    } catch (error) {
        console.error("Error: ", error);
    }
});

/*
fetch("http://localhost:3400/apps", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        name: "Star Wars Jedi: Survivor",
        size: 123
    })
})
    .then(res => res.json())
    .then(result => console.log(result))
    .catch((error) => console.error(error));
 */

app.post("/apps", async (req, res) => {
    const {name, size} = req.body;
    try {
        await App.create({
            name: name,
            size: size
        });
        res.status(201).json({
            message: `Приложение: ${name} с размером ${size} успешно добавлено`
        });
        console.log(`Приложение: ${name} с размером ${size} успешно добавлено`);
    } catch (error) {
        console.error("Error: ", error);
    }
});


app.listen(port, async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully');
        console.log(`Server is running on: http://localhost:${port}`);
    } catch (error) {
        console.error('Server Error:', error);
    }
});

