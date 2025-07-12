const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const Work = require('../models/work');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//Tous les projets
exports.findAll = async (req, res) =>  {
	try {
    const works = await Work.find().populate('categoryId');
    return res.status(200).json(works);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    // Upload  Cloudinary (upload en stream depuis req.file.buffer)
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
    const categoryId = req.body.categoryId;
    const userId = req.auth.userId;

    //Stockage URL Cloudinary dans la base
    const work =new Work({
      title,
      imageUrl: result.secure_url,
      categoryId,
      userId,
    });

    await work.save();

    return res.status(201).json(work);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error:'Something went wrong' });
  }
};

exports.delete = async (req, res) => {
	try{
    await Work.findByIdAndDelete(req.params.id);
		return res.status(200).json({message: 'Work Deleted Successfully'});
	}catch(e){
		return res.status(500).json({ error: 'Something went wrong' });
	}
};
