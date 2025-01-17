const mongoose = require('mongoose');
require('dotenv').config();



const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {console.log("DB connected successfully")})
    .catch((error) =>  {

         console.log("Error while DB connection", error)
         process.exit(1);
         })
    
}

module.exports = dbConnection;

