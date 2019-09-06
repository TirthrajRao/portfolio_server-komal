const Joi = require('joi');

module.exports = {
	createTechnology(body) {
		return new Promise((resolve, reject) => {
			const schema = Joi.object().keys({
				name: Joi.string().required(),
				desc: Joi.string(),
				logo:Joi.string().allow('', null).default(''),
			});

			Joi.validate(body, schema, { convert: true }, (err, value) => {
				if (err && err.details) {
					return reject(err.details[0]);
				} else {
					return resolve(value);
				}
			});
		})
	},
};
