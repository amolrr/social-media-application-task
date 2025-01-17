const cloudinary = require('cloudinary').v2;
require('dotenv').config();


const connectToCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
        console.log("cloudinary connection successfull");
    } catch (error) {
        console.log("Error while cloudinary connection")
    }
}

module.exports = connectToCloudinary;