import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const api_host = process.env.MYSQL_INSTANCE_HOST;
const api_password = process.env.MYSQL_INSTANCE_PASS;

const db_instance = new Sequelize("notes_tcc", "root", api_password, {
    host: api_host,
    dialect: "mysql"
});

export default db_instance; 