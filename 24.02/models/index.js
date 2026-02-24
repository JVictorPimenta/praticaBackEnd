import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "mysql",
    storage: './database.sqlite'
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('conexão com o banco de dados estabelecida!');
    } catch (error) {
        console.error('erro ao conectar:', error);
    }
}

export { sequelize, connect };