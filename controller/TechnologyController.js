const TechnologyValidation = require("../validations/TechnologyValidations");
const TechnologyService = require("../services/technology.service");

module.exports = {
	createTechnology: (req, res) => {
		// console.log('req.body in controller=========>', req.body);
		console.log('req.file in controller=========>', req.file);
		if (req.file.length) {
			delete req.body.logo;
		}
		const file = req.file('uploadFile');
		delete req.body.uploadFile;
		return TechnologyValidation.createTechnology(req.body).then((data) => {
			return TechnologyService.createTechnology(data, file).then(() => {
				res.status(201).json({
					code: 201,
					message: "Technology created"
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

	getAllTechnology: (req, res) => {
		return TechnologyService.getAllTechnologyDetails().then((data) => {
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

	updateTechnology: (req, res) => {
		console.log('req.body=========>', req.body, req.params.technologyId);
		console.log('req.file in controller=========>', req.file);
		if (req.file.length) {
			delete req.body.logo;
		}
		const file = req.file('uploadFile');
		delete req.body.uploadFile;
		return TechnologyService.updateTechnology(req.body, req.params.technologyId,file).then((data) => {
			res.status(200).json({
				code: 200,
				message: "Technology updated",
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
	deleteTechnology: (req, res) => {
		console.log('req.body=========>', req.params.technologyId);
		return TechnologyService.deleteTechnology(req.params.technologyId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "Technology deleted",
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
	getTechnologyById: (req, res) => {
		console.log('req.body=========>', req.params.technologyId);
		return TechnologyService.getTechnologyById(req.params.technologyId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "Technology deleted",
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
