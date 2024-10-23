import mysql from "mysql2";
import "dotenv/config";

const {DB_HOST, MYSQL_USER, MYSQL_PASS, DB_NAME} = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: ", err.stack);
        return;
    }
    console.log(`Connected to the database as id: ${connection.threadId}`);
});

export default connection;