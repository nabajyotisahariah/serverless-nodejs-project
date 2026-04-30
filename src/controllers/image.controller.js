const imageService = require("../services/image.service");

/* Curl:
curl --location 'localhost:3000/images/upload' \
--form 'image=@"/C:/Users/Moptra_IT/Desktop/office.jpg"'
*/
exports.uploadImage = async (req, res) => {
     console.log("Uploading and cropping image..1.",req.file); 
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: "Image file is required." });
  }

  try {
    console.log("Uploading and cropping image..2.",req.file); 
    const result = await imageService.uploadAndCrop(req.file.buffer);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Image upload failed:", error);
    return res.status(500).json({ error: error.message || "Failed to upload image." });
  }
};
