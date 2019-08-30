const projectService = require("../services/project.service");
const projectValidation = require('../validations/ProjectValidation');
module.exports = {
	createProject: (req, res) => {
		console.log('req.body=========>',req.body);
		console.log('req.body=========>',req.file);
		const file = req.file('uploadFile');
		delete req.body.images;
		if(typeof req.body.technology === 'string'){
			req.body.technology = req.body.technology.split(',');
		}
		if(typeof req.body.colorPalette === 'string'){
			req.body.colorPalette = req.body.colorPalette.split(',');
		}
		if(typeof req.body.hashtag === 'string'){
			req.body.hashtag = req.body.hashtag.split(',');
		}
		// console.log("file============>",file)
		return projectValidation.createproject(req.body).then((data) => {
			return projectService.createProject(data, file).then(() => {
				res.status(201).json({
					code: 201,
					message: "Project created"
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

	getProjectsByCategory: (req, res) => {
		return projectService.getProjectsByCategory().then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch((err) =>{ 
			console.log("on line 36 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},

	getSingleProject: (req, res) => {
		const { projectId } = req.params;
		return projectService.getSingleProjectDetails(projectId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "got the data",
				data: data
			})
		}).catch(err => {
			console.log("on line 53 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},

	getFilteredProjects: (req, res) => {
		return projectService.filterProjectsBySearch(req.body).then((data) => {
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

	getAllProjects: (req, res) => {
		return projectService.getAllProjectDetails().then((data) => {
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

	updateProject:(req,res)=>{
		console.log('req.body===========>',req.body,req.params.projectId);
		const file = req.file('uploadFile');
		delete req.body.images;
		if(typeof req.body.technology === 'string'){
			req.body.technology = req.body.technology.split(',');
		}
		if(typeof req.body.colorPalette === 'string'){
			req.body.colorPalette = req.body.colorPalette.split(',');
		}
		return projectService.updateProject(req.body,file,req.params.projectId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "project updated",
				data: data
			})
		}).catch((err) => {
			console.log("on line 111 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	},
	deleteProject:(req,res)=>{
		return projectService.deleteProject(req.params.projectId).then((data) => {
			res.status(200).json({
				code: 200,
				message: "project deleted",
				data: data
			})
		}).catch((err) => {
			console.log("on line 111 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		})
	}
};
