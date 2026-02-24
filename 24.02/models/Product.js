import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import Category from "./category.js";

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Category: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "id"
        }
    }
});

//  relacionamento
Category.hasMany(Product, { foreignKey: 'categoryID', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryID', as: 'category'})

export default Product;