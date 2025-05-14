import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import axios from "axios";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  // File size/type check
  function handleImageFileChange(file) {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, GIF, and WEBP images are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB.");
      return;
    }
    setImageFile(file);
  }

  function handleUploadFeatureImage() {
    if (!imageFile) return;
    const reader = new window.FileReader();
    reader.onloadend = () => {
      dispatch(addFeatureImage(reader.result)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFile(null);
          setUploadedImageUrl("");
        }
      });
    };
    reader.readAsDataURL(imageFile);
  }

  async function handleDeleteFeatureImage(id) {
    try {
      await axios.delete(`http://localhost:5000/api/common/feature/delete/${id}`, { withCredentials: true });
      dispatch(getFeatureImages());
    } catch (err) {
      alert("Failed to delete image");
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        onFileChange={handleImageFileChange}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <img
                  src={`http://localhost:5000${featureImgItem.image}`}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
