const mongoose = require('mongoose');
const mongoDb = process.env.MONGODB;
mongoose.set('strictQuery', false);
mongoose.connect(mongoDb)
    .then(() => console.log('Database Connected!'));
