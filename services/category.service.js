// Database model
const categoryModel = require("../models/category");

module.exports = {
    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            const newCategory = new categoryModel(data);
            newCategory.save((err, savedCategory) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(savedCategory);
                }
            });
        });
    },

    getAllCategoryDetails: () => {
        return new Promise((resolve, reject) => {
            categoryModel.find({}).exec((err, docs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            })
        })
    },

    deleteCategory:(categoryId)=>{
        return new Promise((resolve, reject) => {
            categoryModel.findOneAndDelete({_id:categoryId}).exec((err, category) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(category)
                }
            })
        })
    },

    updateCategory:(body,categoryId)=>{
        console.log('categoryId=========>',categoryId)
        return new Promise((resolve, reject) => {
            categoryModel.findOneAndUpdate({_id:categoryId},body,{upser:true,new:true}).exec((err, category) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('category==========>',category)
                    resolve(category)
                }
            })
        })
    }
}
