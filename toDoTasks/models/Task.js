import { DataTypes } from "sequelize";
import {sequelize} from "../database/sqlConnection.js";

const Task = sequelize.define('Task', {
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
