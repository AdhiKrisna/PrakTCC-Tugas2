import {Sequelize} from "sequelize";

const db_instance = new Sequelize("notes_tcc", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

export default db_instance; 