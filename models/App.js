import {DataTypes} from "sequelize";
import sequelizeInstance from "../config/db.js";

const App = sequelizeInstance.define(
    "App",
    {
        appId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: "Apps",
        timestamps: false
    }
);

export default App;