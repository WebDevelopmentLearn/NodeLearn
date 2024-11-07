import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "./models/user.js";
import sequelizeInstance from "./config/db.js";
import 'dotenv/config';
import {authenticateJWTToken} from "./middleware/authenticateJWTToken.js";


const app = express();
const PORT = process.env.PORT || 3400;
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello World!");
});


//TODO: Register route start
app.post("/register", async(req, res, next) => {
    try {
        const {username, password, email} = req.body;
        if (!username || !password || !email) return res.status(400).json({message: "Для регистрации недостаточно данных"});

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredUser = await User.create({
            username: username,
            password: hashedPassword,
            email: email,
            role: "user"
        });

        res.status(201).json({
            message: `Успех. Пользователь ${username} успешно зарегестрирован`,
            user: registeredUser
        })

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
})
//TODO: Register route end


//TODO: Login route start
app.post("/login", async(req, res, next) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) return res.status(400).json({message: "Для регистрации недостаточно данных"});

        const user = await User.findOne({
            where: {
                "username": username
            }
        });

        if (!user) return res.status(404).json({message: "Данный пользователь не найден"});

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(403).json({message: "Access Denied"});

        const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            },// данные которые будут в токене
            jwtSecret,// секретный ключ
            {
                expiresIn: "1h"// время жизни токена
            });

        res.json({
            message: "Успешный вход в систему",
            token
        })

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});
//TODO: Login route end


//TODO: Update Email route start
app.put("/update-email", authenticateJWTToken, async(req, res, next) => {
    try {
        const {email} = req.body;

        if (!email) res.status(400).json({message: "Отсутствуют данные для обновления"});

        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({message: "Пользователь не найден"});

        const oldEmail = user.email;

        if (oldEmail === email) return res.status(400).json({message: "Вы уже используете этот email"});

        await user.update({
            email
        });

        res.status(201).json({
            message: "Email успешно обновлен",
            user: user,
            oldEmail: oldEmail,
            newEmail: email
        });


    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});
//TODO: Update Email route end


//TODO: Update Role route start
app.put("/update-role", authenticateJWTToken, async(req, res, next) => {
    try {
        const role = req.user.role;
        const {userId, newRole} = req.body;

        if (!userId || !newRole) res.status(400).json({message: "Отсутствуют данные для обновления"});

        if (role !== "admin") return res.status(403).json({
            message: "В доступе отказано!"
        });

        const targetUser = await User.findByPk(userId);

        if (!targetUser) return res.status(404).json({message: "Пользователь не найден"});

        const oldRole = targetUser.role;

        if (oldRole === newRole) return res.status(400).json({message: "У Вас уже имеется данная роль"});


        await targetUser.update({
            role: newRole
        });

        res.status(201).json({
            message: "Роль успешно обновлена",
            user: targetUser,
            oldRole: oldRole,
            newRole: newRole
        });

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
})
//TODO: Update Role route end


//TODO: Delete Account route start
app.delete("/delete-account", authenticateJWTToken, async(req, res, next) => {
    try {
        const userId = req.user.id;

        const targetUser = await User.findByPk(userId);

        if (!targetUser) return res.status(404).json({message: "Пользователь не найден"});

        await targetUser.destroy();
        res.status(201).json({
            message: `Аккаунт пользователя ${targetUser.username} успешно удален`,
            user: targetUser
        });

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
})
//TODO: Delete Account route end


//TODO: Refresh Token route start
app.post("/refresh-token", authenticateJWTToken, async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const oldToken = authHeader && authHeader.split(" ")[1];
        if (!oldToken) {
            res.status(401).json({
                message: "Unauthorized: Token not provided"
            })
        }

        console.log("Token: ", oldToken);


        const newToken = jwt.sign({
                id: req.user.id,
                username: req.user.username,
                role: req.user.role
            },// данные которые будут в токене
            jwtSecret,// секретный ключ
            {
                expiresIn: "1h"// время жизни токена
            });

        res.json({
            message: "Токен успешно обновлен",
            oldToken: oldToken,
            newToken: newToken
        })

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
})
//TODO: Refresh Token route end

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
})

app.listen(PORT, async () => {
    try {
        await sequelizeInstance.authenticate();
        console.log("Connection has been established successfully.");
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Error: ", error);
    }
});
