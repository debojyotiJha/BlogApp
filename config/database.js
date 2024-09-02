const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000
    })
    .then(() => {
        console.log("Connection to DB is successful");
    })
    .catch((error) => {
        console.error("Error in connecting to DB");
        console.error(error);
        process.exit(1); // Exit the process with failure
    });
};

module.exports = connectWithDb;
