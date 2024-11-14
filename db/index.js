import {MongoClient} from "mongodb";
import "dotenv/config";

const url = process.env.MONGO_URL;

const client = new MongoClient(url
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }
);

let dbConnection;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");
        dbConnection = client.db();//Возвращаем подключение к базе данных
    } catch (error) {
        console.error("Failed to connect to MongoDB: ", error);
        throw error;
    }
}

function getDB() {
    if (!dbConnection) {
        throw new Error("Database not connected");
    }
    return dbConnection;
}

export {connectToDatabase, getDB};
