/** Hashtag Mongo DB model	*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hastagSchema = new Schema({
	hashtag: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model("hashtag", hastagSchema);
