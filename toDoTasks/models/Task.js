import { DataTypes } from "sequelize";
import {sequelize} from "../database/sqlConnection.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    }, {
    timestamps: false
});

export default Task;
