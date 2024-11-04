import express from 'express';
import "dotenv/config";
import sequelizeInstance from "./config/db.js";
import Book from "./models/book.js";


const app = express();
const port = process.env.PORT || 4444;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.get('/books', async (req, res, next) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        const errObj = new Error(error.message);
        console.error("Error: ", errObj);
        next(errObj);
    }
});


app.post("/books", async (req, res, next) => {
    const {title, author, year} = req.body;
    try {
        const newBook = await Book.create({
            title: title,
            author: author,
            year: year
        });

        res.status(201).json({
            message: `Книга с названием ${title} за авторством ${author} ${year} года выпуска успешно добавлена`,
            book: newBook
        });

    } catch (error) {
        const errObj = new Error(error.message);
        console.error("Error: ", errObj);
        next(errObj);
    }
});


app.put("/books/:id", async(req, res, next) => {
    const id = req.params.id;
    const {title, author, year} = req.body;
    try {
        const targetBook = await Book.findByPk(id);
        if (!targetBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updatesData = {};
        if (title) updatesData.title = title;
        if (author) updatesData.author = author;
        if (year) updatesData.year = year;

        // Проверяем, есть ли что обновлять
        if (Object.keys(updatesData).length === 0) {
            return res.status(400).json({ message: 'No fields to update' });
        }

        await targetBook.update(updatesData);
        res.status(201).json({ message: 'Book updated successfully', targetBook });
    } catch (error) {
        const errObj = new Error(error.message);
        console.error("Error: ", errObj);
        next(errObj);
    }
});

app.delete("/books/:id", async(req, res, next) => {
    const id = req.params.id;
    try {
        const targetBook = await Book.findByPk(id);
        if (!targetBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await targetBook.destroy();
        res.status(201).json({ message: 'Book successfully deleted', targetBook });

    } catch (error) {
        const errObj = new Error(error.message);
        console.error("Error: ", errObj);
        next(errObj);
    }
});


app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        message: err.message
    });
});


/*
fetch("http://localhost:3400/books", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        "title": "World of Warcraft: Arthas: Rise of the Lich King",
        "author": "Christie Golden ",
        "year": "2010"
    })
})
    .then(res => res.json())
    .then(result => console.log(result))
    .catch((error) => console.error(error));
*/

app.listen(port, async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully');
        console.log(`Server is running on: http://localhost:${port}`);
    } catch (error) {
        console.error('Server Error:', error);
    }
});

