const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.get("/get", getFeatureImages);
router.post("/add", authMiddleware, addFeatureImage);
router.delete("/delete/:id", authMiddleware, deleteFeatureImage);

module.exports = router;
