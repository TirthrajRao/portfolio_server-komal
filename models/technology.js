/** Technology Mongo DB model	*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const technologySchema = new Schema({
	name: { type: String, required: true },
	desc: { type: String },
	logo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("technologies", technologySchema);
