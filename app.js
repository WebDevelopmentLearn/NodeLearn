import express from 'express';
import "dotenv/config";
import sequelizeInstance from "./config/db.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import {Op} from "sequelize";
import cors from "cors";
import {checkPasswordChange} from "./middleware/checkPasswordChange.js";
import {checkUserRole} from "./middleware/checkUserRole.js";


const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.user = {id: 1, role: "admin"};
    next();

})

app.get('/', (req, res) => {
    res.send('Hello World!')
});


app.post("/register", async (req, res) => {
    const {username, password, email} = req.body;
    if (!username || !password || !email)  return res.status(401).send("Все данные должны быть заполнены");

    try {
        const registeredUser = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (registeredUser) {
            return res.status(409).send("Пользователь с данным именем или электронной почтой уже зарегистрирован");

        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            role: "user"
        });
        res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            newUser
        });
    } catch (error) {
        res.status(500).send("Ошибка регистрации пользователя");
        console.error("Error: ", error);
    }
});



app.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send("Необходимо ввести логин и пароль");

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Доступ запрещен: Неверный пароль");

        // Если аутентификация успешна, добавляем пользователя в req
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}, checkPasswordChange, (req, res) => {

    res.send(`Добро пожаловать, ${req.user.username}`);
});



app.post("/change-password", async (req, res, next) => {
    try {
        const {newPassword} = req.body;
        if(!newPassword) {
            return res.status(401).send('New password must include password');
        }
        const user = await User.findByPk(req.user.id);
        if(!user) {
            return res.status(404).send('User not found');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const updatedData = {};
        updatedData.password = hashedPassword;
        updatedData.mustChangePassword = false;

        await user.update(updatedData);
        // user.password = hashedPassword;
        // user.mustChangePassword = false;
        res.send('User password changed successfully');
        console.log(user);
    } catch(error) {
        console.error(error)
        next(error);
    }
})

app.get('/profile/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).send("User not found");
        res.json({
            username: user.username,
            email: user.email,
            role: user.role,
            mustChangePassword: user.mustChangePassword
        });
    } catch (error) {
        res.status(500).send("Ошибка при получении профиля пользователя");
        console.error("Error: ", error);
    }
});

app.post('/change-email', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {
                "email": email
            }
        });


        if (!user) return res.status(404).send("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Неверный пароль");

        const updatedData = {};
        if (email)  updatedData.email = email;

        await user.update(updatedData);

        res.status(201).json({
            message: `Данные успешно обновлены`,
            updatedData: updatedData
        });

    } catch (error) {
        res.status(500).send("Ошибка при получении профиля пользователя");
        console.error("Error: ", error);
    }
});


app.post('/delete-account', async(req,res, next) => {
    if(!req.user.id) {
        return res.status(401).send('User not authorized');
    }
    try {
        const user = await User.findByPk(req.user.id);
        if(!user) {
            return res.status(404).send('User not found');
        }
        const {currentPassword} = req.body;
        if(!currentPassword) {
            return res.status(401).send('Must include current password');
        }
        console.log(user)
        console.log(currentPassword)
        const isPasswordTrue = await bcrypt.compare(currentPassword, user.password);
        if(!isPasswordTrue) {
            return res.status(403).send('Passwords must match. Access denied');
        }

        await user.destroy();

        res.send("User deleted successfully");
    } catch(error) {
        console.error(error)
        next(error);
    }
});



// {
//     "username": "007killer2",
//     "password": "123123"
// }

// {
//     "mustChangePassword": true
// }
app.put("/togglePasswordStatus/:id", async(req, res, next) => {
    const userId = parseInt(req.params.id);
    const {mustChangePassword} = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).send("User not found");
        const updatedData = {};

        if (mustChangePassword) updatedData.mustChangePassword = mustChangePassword;

        await user.update(updatedData);

        res.status(201).json({
            message: `Статус пароля для пользователя ${user.username} успешно изменен`,
            mustChangePassword: user.mustChangePassword
        });
    } catch (error) {
        next(error);
    }
});



app.get("/admin", checkUserRole, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send("Ошибка при получении списка пользователей");
        console.error("Error: ", error);
    }
})



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

app.listen(PORT, async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log('Connection has been established successfully');
        console.log(`Server is running on: http://localhost:${PORT}`);
    } catch (error) {
        console.error('Server Error:', error);
    }
});

