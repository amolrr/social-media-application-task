const cloundinary = require('cloudinary').v2;


const uploadToCloundinary = async(file, folder, height, quality) =>{
        try {

            if(!file || !folder){
                throw new Error("File or folder is missing");
            }
            const options = {folder}
            if(height){
               options.height = height
            }
   
            if(quality){
               options.quality = quality;
            }

            options.resource_type = "auto";
            
            return await cloundinary.uploader.upload(file.tempFilePath, options);
           
        } catch (error) {
            console.log("Error while uploading file to cloudinary", error);
            throw new Error("Error while uploading file to cloudinary")
        }
}
module.exports = uploadToCloundinary;