const nodemailer = require("nodemailer");
const mailerhbs = require("nodemailer-express-handlebars");

// Case:- 1) You can use nodemailer-ses-transport and add aws creadentils
// const ses = require('nodemailer-ses-transport');
// const transporter = nodemailer.createTransport(ses({
//     accessKeyId: process.env.AWSKEY,
//     secretAccessKey: process.env.AWSSECRET,
//     region: process.env.AWSREGION
// }));

// Case:- 2) you can use your own gmail creadentials
// const smtpTransport = require('nodemailer-smtp-transport');
// const transporter = nodemailer.createTransport(smtpTransport({
// 	service: 'Gmail',
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.PASSWORD
// 	}
// }));

// Case:- 3) You can use your own smtp creadentials
const transporter = nodemailer.createTransport({
	host: process.env.HOST,
	port: process.env.SMTPPORT,
	secure: process.env.SECURE,
	auth: {
		user: process.env.SMTPUSERNAME,
		pass: process.env.PASSWORD,
	},
});

transporter.use("compile", mailerhbs({
	// viewEngine: {
	// 	extName: '.hbs',
	// 	partialsDir: 'some/path',
	// 	layoutsDir: 'some/path',
	// 	defaultLayout: 'email.body.hbs',
	// },
	viewPath: "emailTemplate", // Path to email template folder
	extName: ".hbs", // extendtion of email template
}));

const createParams = (from, to, subject, template, name, link) => ({
	from,
	to,
	subject,
	template, // Name email file template
	context: { // pass variables to template
		name,
		email: to,
		link,
	},
});

module.exports.seneWelcomeEmail = (to, template) => {
	// const params = createParams(
	// 	process.env.WELCOMEEMAIL,
	// 	to,
	// 	"Hello Rao, new contact request",
	// 	"welcome",
	// 	// name,
	// 	// link,
	// );
	// console.log("params", params);

	var mailOptions = {
		from: 'tnrtesting2394@gmail.com',
		// to: 'shahmohitm@gmail.com',
		to: to,
		subject: 'Contact Us Form',
		html: template
	};

	transporter.sendMail(mailOptions, (error, response) => {
		// Email not sent
		if (error) {
			console.log("Error in send mail", error);
			console.log("Email not sent");
		} else {
			console.log("Success sending email");
		}
	});
};
