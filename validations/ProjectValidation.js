const Joi = require('joi');

module.exports = {
	createproject(body) {
		return new Promise((resolve, reject) => {
			console.log('req.body in validation============>',body)
			const schema = Joi.object().keys({
				title: Joi.string().required(),
				desc: Joi.string().required(),
				technology: Joi.array().required(),
				category: Joi.string().required(),
				colorPalette: Joi.array(),
				fontFamily: Joi.string(),
				products: Joi.string(),
				services: Joi.string(),
				features: Joi.string(),
				hashtag:Joi.array()
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
