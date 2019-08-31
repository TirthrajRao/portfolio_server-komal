/** project Mongo DB model	*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	title: { type: String, required: true, unique: true },
	desc: { type: String, required: true },
	colorPalette: { type: Array, default: [] },
	images: { type: Array, default: [] },
	fontFamily: { type: String, default: "" },
	technology: [{ type: Schema.Types.ObjectId, required: true, ref: 'technologies' }],
	category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' },
	products: { type: String, default: "" },
	services: { type: String, default: "" },
	features: { type: String, default: "" },
	hashtag: { type: Array,default: [] }
}, { timestamps: true });

module.exports = mongoose.model("projects", projectSchema);
