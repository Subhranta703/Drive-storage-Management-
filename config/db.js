const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connected to DB');
        })
        .catch((err) => {
            console.error('Error connecting to DB:', err);
        });
}

module.exports = connectToDB;
