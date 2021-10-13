const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	category: String,
	imagePath: String,
	description: {
		type: String,
		default:
			"The item do not have a description. If you are Admin, you can edit this product by clicking on the Settings Icon, and give it a description."
	},
	isDefault: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
