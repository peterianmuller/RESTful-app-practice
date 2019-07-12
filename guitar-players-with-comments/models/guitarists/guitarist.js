const mongoose = require('mongoose');

let guitaristSchema = mongoose.Schema({
	name: String,
	bio: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Guitarist', guitaristSchema);
