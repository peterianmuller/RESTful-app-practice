const mongoose = require('mongoose');

let guitaristSchema = mongoose.Schema({
	name: String,
	bio: String
});

module.exports = mongoose.model('guitarist', guitaristSchema);

