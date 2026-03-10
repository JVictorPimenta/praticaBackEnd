import { Sequelize } from "sequelize";

const database = process.env.DB
const user = process.env.DBUSER
const password = process.env.DBPASSWORD

const sequelize = new Sequelize('todotasks', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    storage: './database.sqlite'
})

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('conexão com o banco de dados estabelecida!');
    } catch (error) {
        console.error('erro ao conectar:', error);
    }
}

export { sequelize, connect };