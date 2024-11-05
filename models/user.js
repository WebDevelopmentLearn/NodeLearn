import sequelizeInstance from "../config/db.js";
import {DataTypes} from "sequelize";


const User = sequelizeInstance.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mustChangePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: false  // По умолчанию — не требуется смена пароля
    }
}, {
    tableName: "users",
    timestamps: false
});

export default User;