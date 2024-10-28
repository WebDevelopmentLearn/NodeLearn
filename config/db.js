import {Sequelize} from "sequelize";
import {config as configObj} from "./config.js";

const env = process.env.NODE_ENV || 'development';
const config = configObj[env];


const sequelizeInstance = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
);

export default sequelizeInstance;