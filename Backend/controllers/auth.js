const User = require('../models/User');
const uploadToCloundinary = require('../controllers/fileUpload');
require('dotenv').config();


const createUser = async(req, res) =>{
    try {
        console.log("entered in post request")
        const { name , socialMediaHandle} = req.body;
        if(!name || !socialMediaHandle ){
           return  res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        console.log("user name =>",name)
        console.log("user socialMediaHandle =>", socialMediaHandle)
        const images = req.files.images;
        if(!images){
            return res.status(404).json(
               { success:false,
                message:"Images not found"
            }
            )
        }
           // Ensure `images` is always an array for uniform processing
           const imageArray = Array.isArray(images) ? images : [images];

           // Upload each file to Cloudinary
           const uploadPromises = imageArray.map(file => 
               uploadToCloundinary(file, process.env.FOLDER_NAME)
           );
   
           const uploadedFiles = await Promise.all(uploadPromises);
   
           // Extract secure URLs from uploaded files
           const uploadedUrls = uploadedFiles.map(file => file.secure_url);
           console.log("Uploaded URLs:", uploadedUrls);
   
        
        const user = await User.create({
            name,
            socialMediaHandle,
            images:uploadedUrls
        })
       // console.log("User data => ", user);

      //  console.log("User data =>", user);
        res.status(201).json({
            success:true,
            message:"Entry created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            
        })
    }
}

const getAllData = async(req, res) => {
     try {
        const users = await User.find({});
        res.status(200).json({
            success:true,
            message:"Data fetched successfullty",
            users
        });

      } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
      }
}

module.exports = {
    createUser,
    getAllData
};