const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/user');

exports.signup = async (req, res) => {
	if(!req.body.email || !req.body.password){
		return res.status(400).send({
			message: "Must have email and password"
		});
	}
	try{
		const hash = await bcrypt.hash(req.body.password, 10)
		const user = {
			email: req.body.email,
			password: hash
		}
		await user.save();
		return res.status(201).json({message: 'User Created'})
	}catch (err){
		return res.status(500).send({
			message: err.message
		});
	}

}

exports.login = async (req, res) => {
	try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: new Error('Not Authorized') });
    }

    return res.status(200).json({
      userId: user._id,
      token: jwt.sign(
        { userId: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' }
      )
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
