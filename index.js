import express from "express";
import "dotenv/config";
import connection from "./db.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (_, res) => {
    res.send("Hello There!");
});

app.get("/products", (req, res, next) => {
    const query = `SELECT * FROM products;`;
    connection.query(query, (err, results) => {
        if (err) {
            // console.error("Error fetching products: ", err.stack);
            const err = new Error("Error fetching products");
            next(err);
        }
        res.json(results);
    })
});


/*
fetch("http://localhost:3300/products", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        name: "Молоко",
        price: 1.23
    })
})
    .then(res => res.text())
    .then(result => console.log(result))
    .catch((error) => console.error(error));
 */

app.post("/products", (req, res, next) => {
    const {name, price} = req.body;
    if (name && price) {

        const query = `INSERT INTO products (name, price) VALUES (?, ?)`;
        connection.query(query, [name, price], (err, results) => {
            if (err) {
                // console.error("Error fetching products: ", err.stack);
                const err = new Error("Error fetching products");
                next(err);
            }
            res.status(200).json({
                message: "Продукт успешно добавлен"
            })
        })

    } else {
        const err = new Error("Необходимы name и price");
        next(err);
    }
});



// Middleware для обработки ошибок
app.use((err, req, res, next) => {
    // res.status(err.status || 500); // Устанавливаем статус ответа
    // res.json({
    //     error: {
    //         message: err.message
    //     }
    // });
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message
    })
});


app.post("/users", (req, res) => {
    const {userId, username} = req.body;
    res.json({
        userId: userId,
        username: username
    });
})


app.listen(port, (error) => {
    error ? console.error("Error: ", error) : console.log(`Server running at: http://localhost:${port}`);
});