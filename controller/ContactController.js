const ContactService = require("../services/contact.service");
const ContactValidation = require('../validations/ContactValidation');
module.exports = {
	createContact: (req, res) => {
        // console.log("body in controller", req.body);
		return ContactValidation.createContact(req.body).then((data) => {
			return ContactService.createContact(data).then(() => {
				res.status(201).json({
					code: 201,
					message: "Contact created"
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

	getAllContactRequest:(req,res)=>{
		return ContactService.getAllContactRequest().then((data)=>{
			res.status(200).json({
				code: 200,
				message: "got the data",
				data:data
			});
		}).catch((err) => {
			console.log("on line 19 >>>>>>>>>>>>", err);
			res.status(500).json({
				code: 500,
				message: "Internal server error"
			});
		});
	}
};
