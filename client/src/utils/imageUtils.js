const SERVER_URL = "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${SERVER_URL}${imagePath}`;
}; 