const mongoose = require('mongoose');

const connectDB = async () => {
    try  {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
        console.log('Connecté à Mongo DB')
    } catch (error) {
        console.log('Connection à MongoDB échouée', error);
        process.exit(1);
    }
};

module.exports = connectDB;


