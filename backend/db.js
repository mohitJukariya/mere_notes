const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mere_notes"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to Mongo successfully");
    })
}

module.exports = connectToMongo;