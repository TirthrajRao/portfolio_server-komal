const CategoryService = require("../services/category.service");
const CategoryValidation = require('../validations/CategoryValidation');
module.exports = {
	createCategory: (req, res) => {
		return CategoryValidation.createCategory(req.body).then((data) => {
			return CategoryService.createCategory(data).then(() => {
				res.status(201).json({
					code: 201,
					message: "Category created"
				});
			}).catch((err) => {
				console.log("on line 12 >>>>>>>>>>>>", err);
				res.status(500).json({
					code: 500,
					message: "Internal server error"
				});
			})
		}).catch((err) => {
			console.log("on line 19 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		});
	},

	getSingleCategory: (req, res) => {
		const { categoryId } = req.params;
		return CategoryService.getSingleCategoryDetails(categoryId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch(err => {
			console.log("on line 36 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},

	getAllCategory: (req, res) => {
		return CategoryService.getAllCategoryDetails().then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch((err) => {
			console.log("on line 69 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},

	deleteCategory:(req,res)=>{
		return CategoryService.deleteCategory(req.params.categoryId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch((err) => {
			console.log("on line 69 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},

	updateCategory:(req,res)=>{
		console.log('req.body,req.param.categoryId==========>',req.body,req.params.categoryId)
		return CategoryService.updateCategory(req.body,req.params.categoryId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch((err) => {
			console.log("on line 69 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	}

};
