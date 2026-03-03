import Product from '../models/Product.js'
import Category from '../models/category.js'

const categoryController = {
    getAll: async (req, res) =>{
        console.log(getAllCategories)
    },
    getById: async (req, res) =>{
        console.log(getByIdCategories)
    },
    create: async (req, res) =>{
        console.log(createCategories)
    },
    update: async (req, res) =>{
        console.log(updateCategories)
    },
    delete: async (req, res) =>{
        console.log(deleteCategories)
    },
};

export default categoryController;