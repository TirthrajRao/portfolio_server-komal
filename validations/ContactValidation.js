const Joi = require('joi');

module.exports = {
	createContact(body) {
		// console.log("body in validation", body);
		return new Promise((resolve, reject) => {
			const schema = Joi.object().keys({
				name: Joi.string().required(),
				email: Joi.string().required(),
				message: Joi.string().required(),
				companyName: Joi.string(),
				companyNumber: Joi.string()
			});
	
			Joi.validate(body, schema, { convert: true }, (err, value) => {
				if (err && err.details) {
					return reject(err.details[0]);
				} else {
					return resolve(value);
				}
			}
			);
		});
	}
};
