import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    // console.log("File is uploaded successfully on cloudinary! ", response.url);

    // Don't unlink local file as of now, bcz cloudinary free account won't let free accounts to view uploaded pdf. So to process files for RAG we use locally avaialable files as of now
    // fs.unlinkSync(localFilePath); // remove the locally saved temporary file
    return response;
  } catch (err) {
    // Don't unlink local file as of now, bcz cloudinary free account won't let free accounts to view uploaded pdf. So to process files for RAG we use locally avaialable files as of now
    // fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

const getThumbnailFromFile = async (file: string) => {
  try {
    const res = await cloudinary.image(file, { width: 300, crop: "scale" });
    return res;
  } catch (err) {
    return null;
  }
};

const removePdfFromCloudinary = async (publicId: string) => {
  try {
    console.log({ publicId });
    await cloudinary.api.delete_resources([publicId], {
      type: "upload",
      resource_type: "image",
    });
  } catch (err) {}
};

const removeFromCloudinary = async (
  publicId: string,
  resource_type = "image"
) => {
  try {
    if (!publicId) return false;

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type,
      invalidate: true,
    });
    // console.log(response);

    return response;
  } catch (err) {
    return false;
  }
};

const extractPublicIdFromLink = (link: string | null) => {
  if (!link) return null;
  try {
    const splitArr = link.split("/");
    const arrLen = splitArr.length;
    let publicId = splitArr[arrLen - 1];
    if (publicId.endsWith(".pdf")) publicId = publicId.replace(".pdf", "");
    return publicId;
  } catch (err) {
    return null;
  }
};

export {
  uploadOnCloudinary,
  getThumbnailFromFile,
  removeFromCloudinary,
  extractPublicIdFromLink,
  removePdfFromCloudinary,
};
