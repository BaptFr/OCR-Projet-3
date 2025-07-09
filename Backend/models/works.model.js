const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true,
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
},
	{
	timestamps: false
});

module.exports = mongoose.model('work', workSchema);