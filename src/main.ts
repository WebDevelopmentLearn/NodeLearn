import express, {Application, Request, Response} from "express";
import "dotenv/config";

const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello World!"});
});

app.post("/", (req: Request, res: Response) => {
    const {name, age}: {name: string, age: number} = req.body;
    res.json({name, age});
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});

