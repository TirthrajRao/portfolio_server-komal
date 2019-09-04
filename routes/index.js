const express = require("express");

const router = express.Router();
const ProjectRoute = require("./ProjectRoutes");
const TechnologyRoute = require("./TechnologyRoutes");
const CategoryRoute = require("./CategoryRoutes");
const ContactRoute = require('./ContactRoutes');
const HashtagRoute = require('./HashtagRoute');
const AdminRoute = require('./AdminRoute');
// middleware to use for all requests
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Expose-Headers", "X-My-Custom-Header, X-Another-Custom-Header");
	req.isApi = true;
	next(); // make sure we go to the next routes and don't stop here
});

module.exports = function (app) {
	router.use('/project', ProjectRoute);
	router.use('/technology', TechnologyRoute);
	router.use('/category', CategoryRoute);
	router.use('/contact-us', ContactRoute);
	router.use('/hashtag', HashtagRoute);
	router.use('/admin', AdminRoute)
	app.use("/api", router);
};
