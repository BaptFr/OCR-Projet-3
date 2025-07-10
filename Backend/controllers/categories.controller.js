const Category = require('../models/category');

exports.findAll = async (req, res) =>  {
	try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ error: new Error('Error to findAll') });
  }
};

exports.create = async (req, res) => {

	 try {
    const category = new Category({
      name: req.body.name
    });
    await category.save();
    return res.status(201).json(category);
  } catch (err) {
    return res.status(500).json({ error: new Error('Error creating category') });
  }
};