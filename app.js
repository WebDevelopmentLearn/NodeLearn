import express from 'express';
import cors from 'cors';
import {connectToDatabase, getDB} from "./db/index.js";
import {ObjectId} from "mongodb";

const app = express();
const PORT = process.env.PORT || 3400;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//TODO: Получение всех продуктов
app.get("/products", async(req, res, next) => {
    try {
        const db = getDB();
        const products = await db.collection("products").find().toArray();//Получаем все продукты (Внимание: не использовать 'toArray()' если записей больше 10000)
        res.json(products);

    } catch (error) {
        next(error);
    }
});

//TODO: Получение продукта по ID
app.get("/products/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const db = getDB();
        if (!id) {
            res.status(400).json({
                message: "Пожалуйста, укажите ID продукта"
            });
        }

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Указан неверный ID продукта"
            });
        }

        const product = await db.collection("products").findOne({ _id: new ObjectId(id)});
        if (!product) {
            res.status(404).json({
                message: "Продукт не найден"
            });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

//TODO: Добавление нового продукта
app.post("/products", async(req, res, next) => {
    try {
        const db = getDB();
        const {title, price, description} = req.body;
        if (!title || !price || !description) {
            res.status(400).json({
                message: "Пожалуйста, укажите название, цену и описание продукта"
            });
        }
        const result = await db.collection("products").insertOne({
            title: title,
            price: price,
            description: description
        });
        console.log("Result: ", result);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


//TODO: Обновление продукта по ID
app.put("/products/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const {title, price, description} = req.body;
        const db = getDB();
        if (!id) {
            res.status(400).json({
                message: "Пожалуйста, укажите ID продукта"
            });
        }

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Указан неверный ID продукта"
            });
        }

        const targetProduct = await db.collection("products").findOne({ _id: new ObjectId(id)});
        if (!targetProduct) {
            res.status(404).json({
                message: "Продукт не найден"
            });
        }

        const updatedData = {};
        if (title) updatedData.title = title;
        if (price) updatedData.price = price;
        if (description) updatedData.description = description;

        const result = await db.collection("products").updateOne({ _id: new ObjectId(id)}, { $set: updatedData});
        res.json(result);

    } catch (error) {
        next(error);
    }
});


//TODO: Удаление продукта по ID
app.delete("/products/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const db = getDB();
        if (!id) {
            res.status(400).json({
                message: "Пожалуйста, укажите ID продукта"
            });
        }

        if (!ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Указан неверный ID продукта"
            });
        }

        const targetProduct = await db.collection("products").findOne({ _id: new ObjectId(id)});
        if (!targetProduct) {
            res.status(404).json({
                message: "Продукт не найден"
            });
        }

        const result = await db.collection("products").deleteOne({_id: new ObjectId(id)});
        res.json(result);

    } catch (error) {
        next(error);
    }
})


//TODO: Обработка ошибок
app.use((err, req, res, next) => {
    console.error("Error: ", err);
    res.status(500).send("Internal server error. Please see the logs for more details");
});



app.listen(PORT, async() => {
    try {
        await connectToDatabase();
        console.log(`Server is running at: http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error: ", error);
    }
});