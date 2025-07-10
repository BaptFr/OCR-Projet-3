const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require('../models');
const Works = db.works;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.findAll = async (req, res) =>  {
	const works = await Works.findAll({include: 'category'});
	return res.status(200).json(works);
}

exports.create = async (req, res) => {
  try {
    // Upload vers Cloudinary (upload en stream depuis req.file.buffer)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'sophie-bluel' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const title = req.body.title;
    const categoryId = req.body.category;
    const userId = req.auth.userId;

    //Stockage URL Cloudinary dans la base
    const work = await Works.create({
      title,
      imageUrl: result.secure_url,
      categoryId,
      userId,
    });

    return res.status(201).json(work);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: new Error('Something went wrong') });
  }
};

exports.delete = async (req, res) => {
	try{
		await Works.destroy({where:{id: req.params.id}})
		return res.status(204).json({message: 'Work Deleted Successfully'})
	}catch(e){
		return res.status(500).json({error: new Error('Something went wrong')})
	}

}
