const Feature = require("../../models/Feature");
const fs = require("fs");
const path = require("path");

const getFeatureImages = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: features,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Create featured directory if it doesn't exist
    const featuredDir = path.join(__dirname, "../../data/featured");
    if (!fs.existsSync(featuredDir)) {
      fs.mkdirSync(featuredDir, { recursive: true });
    }

    // Save image to featured directory
    const imageName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    const imagePath = path.join(featuredDir, imageName);
    
    // Convert base64 to image and save
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(imagePath, base64Data, "base64");

    // Save image path to database
    const feature = await Feature.create({
      image: `/data/featured/${imageName}`,
    });

    res.status(201).json({
      success: true,
      data: feature,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const feature = await Feature.findById(id);
    if (!feature) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    // Remove file from disk
    const imagePath = path.join(__dirname, '../../', feature.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    await Feature.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
};
