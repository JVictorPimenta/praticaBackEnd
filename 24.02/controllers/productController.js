import Product from '../models/Product.js'
import Category from '../models/category.js'

const productController = {
    getAll: async (req, res) =>{
        console.log(getAllProducts)
    },
    getById: async (req, res) =>{
        console.log(getByIdProducts)
    },
    create: async (req, res) =>{
        console.log(createProducts)
    },
    update: async (req, res) =>{
        console.log(updateProducts)
    },
    delete: async (req, res) =>{
        console.log(deleteProducts)
    },
};

export default productController;